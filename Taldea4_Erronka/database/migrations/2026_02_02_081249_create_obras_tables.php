<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. OBRAK TAULA
        Schema::create('obras', function (Blueprint $table) {
            $table->id();
            $table->string('izenburua');
            $table->string('artista'); // Erabiltzaile IDa izan daiteke etorkizunean
            $table->string('irudia'); // Irudiaren ruta
            $table->integer('prezioa')->nullable();
            $table->text('deskribapena')->nullable();
            $table->enum('mota', ['klasikoa', 'modernoa', 'urbanoa', 'eskultura']);
            $table->string('data')->nullable(); // Urtea
            $table->string('kokalekua')->nullable();
            $table->timestamps();
        });

        // 2. LIKES TAULA (Ranking-erako)
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('obra_id')->constrained('obras')->onDelete('cascade');
            $table->timestamps();
            
            // Erabiltzaile bakoitzak like bakarra obra bakoitzeko
            $table->unique(['user_id', 'obra_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('likes');
        Schema::dropIfExists('obras');
    }
};