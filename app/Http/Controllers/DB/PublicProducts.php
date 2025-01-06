<?php

namespace App\Http\Controllers\DB;

use Inertia\Inertia;
use App\Models\Products;
use Illuminate\Http\Request;
use App\Models\ProductsCategories;
use App\Models\ProductStorageKeys;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\ProductsHeelHeightValues;
use App\Models\PublicProducts as ModelsPublicProducts;

class PublicProducts extends Controller
{
    public function index()
    {
        // dd(Products::with(['colors.orderType', 'categories']))->get();
        $items = Products::where('products.status', '=', 'active')->leftJoin(
            'products_category_values', 
            'products_category_values.product_id', 
            '=', 
            'products.id'
        )->leftJoin(
            'products_categories', 
            'products_categories.id', 
            '=', 
            'products_category_values.category_id'
        )->select(
            'products.id as id','products.model', 'products.status',
            'products_categories.categories as category'
        )
        ->get();

        $urlPath = config('filesystems.disks.do.url');

        // Fetch all storage keys in one query
        $productIds = $items->pluck('id'); // Collect all product IDs


        // Initialize an array to store the final results
        $response = [];

        // Iterate through the items to handle data and avoid duplication
        foreach ($items as $item) {
            // Get the storage keys for this product

            // $storage = ProductStorageKeys::select(DB::raw("CONCAT('$urlPath', 'storage_values') AS storage_values"))
            //     ->where('product_id', $item->id)
            //     ->get();
            $storage = ProductStorageKeys::select("storage_values")
                ->where('product_id', $item->id)
                ->get();
            // if($item == 5){
            //     dd($storage);
            // }
            // Map storages by product_id for quick access
            $heel_heights = ProductsHeelHeightValues::where('product_id', $item->id)->leftJoin(
                'products_heel_heights',
                'products_heel_heights.id',
                '=',
                'products_heel_height_values.heel_height_id'
            )->select('products_heel_heights.heel_heights as heel_height')->get();

            // Check if the item is already added in the response array
            if (!isset($response[$item->id])) {
                // If not, add it with categories and heel heights combined into arrays
                $response[$item->id] = [
                    'id' => $item->id,
                    'model' => $item->model,
                    'status' => $item->status,
                    'category' => $item->category,  // Initialize as an empty array
                    'heel_heights' => $heel_heights ? $heel_heights : null, // Initialize as an empty array
                    'image_url' => $storage ? $storage : null // Add the storage key or null
                ];
            }
        }

        // Convert the final result to an indexed array for the response
        $response = array_values($response);

        // Return the response as JSON
        return response()->json($response );
    }

    public function get_categories() {
        $categories = ProductsCategories::all();
        return response()->json($categories);
    }

    public function show($id)
    {
        // dd(Products::with(['colors', 'categories']));
        $items = ModelsPublicProducts::leftJoin(
            'products', 
            'products.id', 
            '=', 
            'public_product.product_id'
        )->select(
            'products.model',
            'products.category',
        )->where(
            'public_product.product_id', '=', $id
        )->get();
        return response()->json($items);
    }

    public function public_gallery($id){
        // Products Check
        // Colors Check
        // Order Types Check
        // Sizes
        // Heel Heights
        // Category Check
        // Storage Keys
        // $items = Products::where('products.id', '=', $id)->leftJoin(
        //     'products_category_values', 
        //     'products_category_values.product_id', 
        //     '=', 
        //     'products.id'
        // )->leftJoin(
        //     'products_categories', 
        //     'products_categories.id', 
        //     '=', 
        //     'products_category_values.category_id'
        // )->select(
        //     'products.id as id','products.model', 'products.status',
        //     'products_categories.categories as category'
        // )
        // ->get();

        // $urlPath = config('filesystems.disks.do.url');

        // // Fetch all storage keys in one query
        // $productIds = $items->pluck('id'); // Collect all product IDs


        // // Initialize an array to store the final results
        // $response = [];

        // // Iterate through the items to handle data and avoid duplication
        // foreach ($items as $item) {
        //     // Get the storage keys for this product

        //     // $storage = ProductStorageKeys::select(DB::raw("CONCAT('$urlPath', 'storage_values') AS storage_values"))
        //     //     ->where('product_id', $item->id)
        //     //     ->get();
        //     $storage = ProductStorageKeys::select("storage_values")
        //         ->where('product_id', $item->id)
        //         ->get();
        //     // if($item == 5){
        //     //     dd($storage);
        //     // }
        //     // Map storages by product_id for quick access
        //     $heel_heights = ProductsHeelHeightValues::where('product_id', $item->id)->leftJoin(
        //         'products_heel_heights',
        //         'products_heel_heights.id',
        //         '=',
        //         'products_heel_height_values.heel_height_id'
        //     )->select('products_heel_heights.heel_heights as heel_height')->get();

        //     // Check if the item is already added in the response array
        //     if (!isset($response[$item->id])) {
        //         // If not, add it with categories and heel heights combined into arrays
        //         $response[$item->id] = [
        //             'id' => $item->id,
        //             'model' => $item->model,
        //             'status' => $item->status,
        //             'category' => $item->category,  // Initialize as an empty array
        //             'heel_heights' => $heel_heights ? $heel_heights : null, // Initialize as an empty array
        //             'image_url' => $storage ? $storage : null // Add the storage key or null
        //         ];
        //     }
        // }

        // // Convert the final result to an indexed array for the response
        // $response = array_values($response);
        // return Inertia::render('Products/Gallery/Page', [
        //     'item' => $item
        // ]);

        // dd('test');
        // DB::enableQueryLog();
        $product = Products::with(['categories','colors:id,color', 'colors.orderType:id,name', 'sizes:id,sizes', 'sizes.sizeValues'])->find($id);
        // dd($product->sizes);
        $result = [
            'id' => $product->id,
            'product_name' => $product->model,
            'status' => $product->status,
            'categories' => $product->categories->map(function($category) {
                return [
                    'category_name' => $category->categories,
                    'gender' => $category->gender
                ];
            }),
            'colors' => $product->colors->map(function($color) {
                // Fetch only the first order type (since each color has only one order type)
                $orderType = $color->orderType[0]; // Use first() to get a single result
        
                return [
                    'color_name' => $color->color,
                    'order_type_name' => $orderType ? $orderType->name : null // Handle cases where no order type is found
                ];
            }),
            'sizes' => $product->sizes->map(function($size){
                return [
                    'size_name' => $size->sizes,
                    'size_values' => $size->sizeValues->map(function($values) {
                        return [
                            'values' => $values->size_values
                        ];
                    })
                ];
            }),
            'heel_heights' => $product->heel_heights->map(function($value){
                return [
                    'heel_height_value' => $value->heel_heights
                ];
            })
        ];

        // dd($result);

        // dd(DB::getQueryLog());
        // dd($products->categories);

        return Inertia::render('Products/Gallery/Page', [
            'item' => $result
        ]);
    }
}
