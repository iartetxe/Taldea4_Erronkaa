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
        Schema::table('obras', function (Blueprint $table) {
            $table->dateTime('enkante_amaiera')->nullable(); // Fecha fin subasta
            $table->decimal('hasierako_prezioa', 10, 2)->nullable(); // Precio salida
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('obras', function (Blueprint $table) {
            $table->dropColumn('enkante_amaiera');
            $table->dropColumn('hasierako_prezioa');
        });
    }
};