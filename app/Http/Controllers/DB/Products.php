<?php

namespace App\Http\Controllers\DB;

use Log;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\ProductsColors;
use Illuminate\Support\Facades\DB;
use App\Models\ProductsColorValues;
use App\Models\ProductSizeValueIds;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Models\ProductsCategoryValues;
use App\Models\ProductsHeelHeightValues;
use App\Models\Products as ModelsProducts;
use App\Models\ProductStorageKeys;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;

class Products extends Controller
{
    public function index()
    {
        // Fetch paginated data
        $items = ModelsProducts::paginate(5);

        // Return the paginated data using Inertia
        return Inertia::render('Products/Page', [
            'items' => $items
        ]);
    }

    public function edit_product($id)
    {
        $items = ModelsProducts::where('products.id', '=', $id)
            ->leftJoin('product_size_value_ids', 'product_size_value_ids.product_id', '=', 'products.id')
            ->leftJoin('products_sizes', 'products_sizes.id', '=', 'product_size_value_ids.size_value_id')
            ->leftJoin('products_category_values', 'products_category_values.product_id', '=', 'products.id')
            ->leftJoin('products_categories', 'products_categories.id', '=', 'products_category_values.category_id')
            ->select('products.id', 'products.model', 'products.status', 'products_sizes.id as size_id', 'products_categories.id as category_id')
            ->firstOrFail();
        
        // dd($items);
        // Return the paginated data using Inertia
        return Inertia::render('Products/Edit/Page', [
            'items' => $items
        ]);
    }

    public function get_product_keys($id)
    {
        $dataKeys = ProductStorageKeys::where('product_id', $id)->get();
        
        // // Decrypt each key
        $dataWithUrls = $dataKeys->map(function ($key) {

            
            return [
                'id' => $key['id'],
                'product_id' => $key['product_id'],
                'storage_values' => $key['storage_values'], // Decrypt the value
                'storage_url' => config('filesystems.disks.do.url') . '/' . $key['storage_values'], // Decrypt the value
                'created_at' => $key['created_at'],
                'updated_at' => $key['updated_at'],
            ];
        });
    
        // // Dump the decrypted keys (optional for debugging)
        // // dd($decryptedKeys);
    
        // // Return the decrypted keys as JSON
        return response()->json($dataWithUrls);
    }

    // public function create_product_keys(Request $request, $id){
    //     $request->validate([
    //         'product_keys' => 'required|array|min:5', // Ensure it's an array and has at least 5 items
    //     ]);
    //     // dd($request->product_keys[0]['value']);
    //     try {
    //         DB::beginTransaction();
    //         if($request->product_keys){
    //             foreach ($request->product_keys as $keys) {
    //                 $value = $keys['value'] ?? 'empty';
    
    //                 // Encrypt the value
    //                 $encryptedValue = Crypt::encrypt($value);
    
    //                 // Save the encrypted value
    //                 ProductStorageKeys::create([
    //                     'product_id' => $id,
    //                     'storage_values' => $encryptedValue,
    //                 ]);
    //             }
    //             DB::commit();
    //         }
    //         else {
    //             // If product creation fails, throw an exception to trigger a rollback
    //             throw new \Exception('Product creation failed');
    //             // return redirect()->back()->with('error', 'Product creation failed!');
    //         }
    //         // return redirect()->back()->with('success', 'Product created successfully!');
    //     } catch (\Exception $e) {
    //         DB::rollBack();
    //         error_log('Error creating product: ' . $e->getMessage());
    //         // Log the error (optional)
    //         // Logs::error('Error creating product: ' . $e->getMessage());
        
    //         // Return an error response
    //         return redirect()->back()->with('error', 'Something went wrong: ' . $e->getMessage());
    //     }

    // }

    public function destroy_product_keys(Request $request): RedirectResponse 
    {
        // dd($request);
        // $request->validate([
        //     'id' => 'required',
        // ]);
 
        Storage::disk('do')->delete($request->path);

        $image = ProductStorageKeys::findOrFail($request->id);
        
        if($image){
            $image->delete();
            return redirect()->back()->with('success', 'Successfully Deleted!');
        }
        else{
            return redirect()->back()->with('error', 'Cannot Find the categories!');
        }
    }

    public function create_products(Request $request): RedirectResponse 
    {
        // foreach($request->color_id as $colors){
        //     dd($colors['id']);
        // }
        // dd($request);
        $request->validate([
            'model' => 'required|string|max:255',
            'status' => 'required',
            'color_id' => 'required',
            'size_id' => 'required',
            'heel_height_id' => 'required',
            'category_id' => 'required'
        ]);

        try {
            // Start a database transaction
            DB::beginTransaction();
        
            // Create the product and retrieve the created instance
            $product = ModelsProducts::create([
                'model' => $request->model,
                'status' => $request->status
            ]);
        
            // Get the created ID
            $createdId = $product->id;
        
            if ($createdId) {
                // Insert related data into other tables
                foreach ($request->color_id as $colors) {
                    ProductsColorValues::create([
                        'color_id' => $colors['id'], 
                        'product_id' => $createdId, 
                        'order_type_id' => 0
                    ]);
                }
        
                foreach ($request->heel_height_id as $heel_height) {
                    ProductsHeelHeightValues::create([
                        'heel_height_id' => $heel_height, 
                        'product_id' => $createdId
                    ]);
                }

                foreach ($request->size_id as $size_id){
                    ProductSizeValueIds::create([
                        'size_value_id' => $size_id, 
                        'product_id' => $createdId
                    ]);
                }
        
                ProductsCategoryValues::create([
                    'category_id' => $request->category_id, 
                    'product_id' => $createdId
                ]);
        
                // Commit the transaction if all operations succeed
                DB::commit();
            } else {
                // If product creation fails, throw an exception to trigger a rollback
                throw new \Exception('Product creation failed');
                // return redirect()->back()->with('error', 'Product creation failed!');
            }
        
            return redirect()->back()->with('success', 'Product created successfully!');
        } catch (\Exception $e) {
            // Rollback the transaction in case of any error
            DB::rollBack();
            error_log('Error creating product: ' . $e->getMessage());
            // Log the error (optional)
            // Logs::error('Error creating product: ' . $e->getMessage());
        
            // Return an error response
            return redirect()->back()->with('error', 'Something went wrong: ' . $e->getMessage());
        }
    }

    public function update_status(Request $request): RedirectResponse {
        // dd($request);
        $status = ModelsProducts::findOrFail($request->id);
        $status->update(['status' => $request->input('status')]);
        return redirect()->back()->with('success', 'Successfully Updated the Status!');
    }

    public function update_model(Request $request): RedirectResponse {
        // dd($request);
        $model = ModelsProducts::findOrFail($request->id);
        $model->update(['model' => $request->input('model')]);
        return redirect()->back()->with('success', 'Successfully Updated the model!');
    }

}
