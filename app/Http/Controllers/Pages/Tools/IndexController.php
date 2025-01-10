<?php

namespace App\Http\Controllers\Pages\Tools;

use Inertia\Inertia;
use App\Models\PageSections;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class IndexController extends Controller
{
    public function index()
    {
        return Inertia::render('Tools/Attributes/PageSections/Page', [
            'items' => PageSections::all()
        ]);
    }
}
