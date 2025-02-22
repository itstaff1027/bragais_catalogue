<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products_color_values', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('product_id');
            $table->integer('color_id');
            $table->integer('order_type_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products_color_values');
    }
};
