<?php

namespace App\Http\Controllers\DB;

use Log;
use Illuminate\Http\Request;
use App\Models\ProductsColors;
use Illuminate\Support\Facades\DB;
use App\Models\ProductsColorValues;
use App\Http\Controllers\Controller;
use App\Models\ProductSizeValueIds;
use Illuminate\Http\RedirectResponse;
use App\Models\ProductsCategoryValues;
use App\Models\ProductsHeelHeightValues;
use App\Models\Products as ModelsProducts;

class Products extends Controller
{
    public function index()
    {
        $items = ModelsProducts::all();
        return response()->json($items);
    }

    public function show($id)
    {
        $items = ModelsProducts::findOrFail($id);
        return response()->json($items);
    }

    public function create_products(Request $request): RedirectResponse 
    {
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
                        'color_id' => $colors, 
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
        
                ProductsCategoryValues::create([
                    'category_id' => $request->category_id, 
                    'product_id' => $createdId
                ]);
        
                ProductSizeValueIds::create([
                    'size_value_id' => $request->size_id, 
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

}
