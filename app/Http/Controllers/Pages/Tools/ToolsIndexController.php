<?php

namespace App\Http\Controllers\Pages\Tools;

use Inertia\Inertia;
use App\Models\PageSections;
use Illuminate\Http\Request;
use App\Models\PageSectionImages;
use App\Http\Controllers\Controller;

class ToolsIndexController extends Controller
{
    public function index()
    {
        return Inertia::render('Tools/Page', [
            'items' => PageSections::all(),
            'page_images' => PageSectionImages::with('section')->get()
        ]);
    }
}
