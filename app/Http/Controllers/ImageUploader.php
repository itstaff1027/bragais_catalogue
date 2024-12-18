<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Models\ProductStorageKeys;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageUploader extends Controller
{
    public function upload(Request $request)
    {
        // dd(config('filesystems.disks.do.url'));
        // dd($request);
        // Validate the image
        $request->validate([
            'image' => 'required|image|mimes:webp,jpeg,png',
        ]);

        // Retrieve the product to associate the image with
        // $product = Products::findOrFail($request->id);

        // Handle the image upload
        $path = Storage::disk('do')->putFile($request->folder, $request->file('image'));
        $url = config('filesystems.disks.do.url') . '/' . $path;
        // Store the image in the database, associating it with the product
        // $imagePath = 
        ProductStorageKeys::create([
            'product_id' => $request->id,
            'storage_values' => $path,
        ]);
        
        
        return redirect()->back()->with('success', 'Successfully Added New Image!');
    }
}
