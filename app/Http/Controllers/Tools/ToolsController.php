<?php

namespace App\Http\Controllers\Tools;

use Inertia\Inertia;
use App\Models\PageSections;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class ToolsController extends Controller
{
    public function index()
    {
        return Inertia::render('Tools/Attributes/PageSections/Page', [
            'items' => PageSections::all()
        ]);
    }

    public function show($id)
    {
        $items = PageSections::findOrFail($id);
        return response()->json($items);
    }

    public function create_page_sections(Request $request): RedirectResponse 
    {
        $request->validate([
            'page_section_value' => 'required|string|max:255'
        ]);

        PageSections::create([
            'section_name' => $request->page_section_value
        ]);

        return redirect()->back()->with('success', 'New Page Section Added Rows!');
    }

    public function update_page_sections(Request $request, $id) {
        $request->validate([
            'page_section_value' => 'required|string|max:255',
        ]);
    
        $product = PageSections::findOrFail($id);
        $product->update(['section_name' => $request->page_section_value]);

        return Redirect::back()->with('success', 'Updated Page Section Rows!');
    }

    public function destroy_page_sections(Request $request, $id): RedirectResponse 
    {
        $request->validate([
            'id' => 'required',
        ]);

        $page_sections = PageSections::findOrFail($id);
        
        if($page_sections){
            $page_sections->delete();
            return redirect()->back()->with('success', 'Successfully Deleted!');
        }
        else{
            return redirect()->back()->with('error', 'Cannot Find the Heel Height!');
        }
    }
}
