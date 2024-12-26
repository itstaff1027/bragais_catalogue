<?php

namespace App\Http\Controllers\DB;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Models\ProductsCategories as ModelsProductsCategories;
use App\Models\ProductsCategoryValues;

class ProductsCategories extends Controller
{
    public function get_categories() {
        $categories = ModelsProductsCategories::all();
        return response()->json($categories);
    }

    public function create_categories(Request $request): RedirectResponse 
    {
        $request->validate([
            'categories_name' => 'required|string|max:255',
        ]);

        ModelsProductsCategories::create([
            'categories' => $request->categories_name,
        ]);

        return redirect()->back()->with('success', 'New categories Added!');
    }

    public function update_categories(Request $request, $id) {
        $request->validate([
            'categories_name' => 'required|string|max:255',
        ]);
    
        $product = ModelsProductsCategories::findOrFail($id);
        $product->update(['categories' => $request->input('categories_name')]);

        return redirect()->back()->with('success', 'Updated categories!');
    }

    public function update_categories_gender(Request $request, $id) {
        // dd($request->input('categories_gender'));
        $request->validate([
            'categories_gender' => 'required|string|max:255',
        ]);
    
        $product = ModelsProductsCategories::findOrFail($id);
        // dd($product);
        $product->update(['gender' => $request->input('categories_gender')]);

        return redirect()->back()->with('success', 'Updated categories!');
    }

    public function update_product_category(Request $request){
        // Find the record by the `product_id` column
        $product_category = ProductsCategoryValues::where('product_id', $request->id)->first();

        // Check if the record exists
        if (!$product_category) {
            return redirect()->back()->with('error', 'Product Category not found!');
        }

        // Update the category_id
        $product_category->update(['category_id' => $request->category_id]);

        // Return success response
        return redirect()->back()->with('success', 'Product Category has been updated!');
    }

    public function destroy_categories(Request $request, $id): RedirectResponse 
    {
        $request->validate([
            'id' => 'required',
        ]);

        $categories = ModelsProductsCategories::findOrFail($id);
        
        if($categories){
            $categories->delete();
            return redirect()->back()->with('success', 'Successfully Deleted!');
        }
        else{
            return redirect()->back()->with('error', 'Cannot Find the categories!');
        }
    }
}
