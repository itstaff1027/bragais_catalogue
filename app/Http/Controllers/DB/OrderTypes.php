<?php

namespace App\Http\Controllers\DB;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Models\OrderTypes as ModelsOrderTypes;

class OrderTypes extends Controller
{
    public function index()
    {
        $items = ModelsOrderTypes::all();
        return response()->json($items);
    }

    public function show($id)
    {
        $items = ModelsOrderTypes::findOrFail($id);
        return response()->json($items);
    }

    public function create_order_types(Request $request): RedirectResponse 
    {
        $request->validate([
            'order_type_value' => 'required|string|max:255'
        ]);

        ModelsOrderTypes::create([
            'name' => $request->order_type_value
        ]);

        return redirect()->back()->with('success', 'New Order Types Added!');
    }

    public function update_order_types(Request $request, $id) {
        $request->validate([
            'order_type_value' => 'required|string|max:255',
        ]);
    
        $product = ModelsOrderTypes::findOrFail($id);
        $product->update(['name' => $request->order_type_value]);

        return redirect()->back()->with('success', 'Updated Order Types!');
    }

    public function destroy_order_types(Request $request, $id): RedirectResponse 
    {
        $request->validate([
            'id' => 'required',
        ]);

        $order_types = ModelsOrderTypes::findOrFail($id);
        
        if($order_types){
            $order_types->delete();
            return redirect()->back()->with('success', 'Successfully Deleted!');
        }
        else{
            return redirect()->back()->with('error', 'Cannot Find the Heel Height!');
        }
    }
}
