<?php

namespace App\Http\Controllers;

use App\Models\PageSectionImages;
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
            'image' => 'required|array|min:1',
            'image.*' => 'required|image|mimes:webp,jpeg,png',
        ]);

        // dd(config('filesystems.disks.do.url'));

        $uploadedFiles = $request->file('image');
        // $filePaths = [];

        // dd($uploadedFiles[0]);

        foreach($uploadedFiles as $file){
            $path = Storage::disk('do')->putFileAs($request->folder, $file, $file->getClientOriginalName());
            ProductStorageKeys::create([
                'product_id' => $request->id,
                'storage_values' => $path,
            ]);
        }
        // dd($uploadedFiles);

        // Retrieve the product to associate the image with
        // $product = Products::findOrFail($request->id);

        // Handle the image upload
        // $path = Storage::disk('do')->putFile($request->folder, $request->file('image'));
        // $url = config('filesystems.disks.do.url') . '/' . $path;
        // Store the image in the database, associating it with the product
        // $imagePath = 
        // ProductStorageKeys::create([
        //     'product_id' => $request->id,
        //     'storage_values' => $path,
        // ]);
        
        
        return redirect()->back()->with('success', 'Successfully Added New Image!');
    }

    public function upload_image_section(Request $request)
    {

        
        $request->validate([
            'imageTop.*' => 'required|image|mimes:webp,jpeg,png',
            'imageBody.*' => 'required|image|mimes:webp,jpeg,png',
            'imageBottom.*' => 'required|image|mimes:webp,jpeg,png',
            'imageFooter.*'=> 'required|image|mimes:webp,jpeg,png',
            'imageWomensXScrollable.*' => 'required|image|mimes:webp,jpeg,png',
            'imageMensXScrollable.*' => 'required|image|mimes:webp,jpeg,png',
        ]);
        // $image = $request->file('data');
        // dd($request->file($request->input('page_section')));
        // dd($request);
        $uploadedFiles = $request->file($request->input('page_section'));
        // dd($uploadedFiles);
        foreach($uploadedFiles as $file){
            $path = Storage::disk('do')->putFileAs($request->folder, $file, $file->getClientOriginalName());
            PageSectionImages::create([
                'section_id' => $request->input('section_id'),
                'image_url' => $path,
                'gender' => $request->input('gender'),
                'position' => 0,
                'styles' => 'none'
            ]);
        }
        
        return redirect()->back()->with('success', 'Successfully Added New Image!');
    }

    public function update_image_section(Request $request)
    {

        
        $request->validate([
            'imageTop.*' => 'required|image|mimes:webp,jpeg,png',
            'imageBody.*' => 'required|image|mimes:webp,jpeg,png',
            'imageBottom.*' => 'required|image|mimes:webp,jpeg,png',
            'imageFooter.*'=> 'required|image|mimes:webp,jpeg,png',
            'imageWomensXScrollable.*' => 'required|image|mimes:webp,jpeg,png',
            'imageMensXScrollable.*' => 'required|image|mimes:webp,jpeg,png',
        ]);

        // dd($request);

        Storage::disk('do')->delete($request->image_path);

        $page_image = PageSectionImages::findOrFail($request->input('section_image_id'));
        $page_image->delete();

        $uploadedFiles = $request->file($request->input('page_section'));
        // dd($uploadedFiles);
        foreach($uploadedFiles as $file){
            $path = Storage::disk('do')->putFileAs($request->folder, $file, $file->getClientOriginalName());
            PageSectionImages::create([
                'section_id' => $request->input('section_id'),
                'image_url' => $path,
                'gender' => $request->input('gender'),
                'position' => 0,
                'styles' => 'none'
            ]);
        }
        
        return redirect()->back()->with('success', 'Successfully Added New Image!');
    }

    public function destroy_image_scrollable(Request $request){

        // dd($request);
        Storage::disk('do')->delete($request->path);

        $page_image = PageSectionImages::findOrFail($request->input('id'));
        $page_image->delete();

        return redirect()->back()->with('success', 'Successfully Delete an image!');
    }
}
