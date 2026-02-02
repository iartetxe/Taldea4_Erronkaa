<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('obras', function (Blueprint $table) {
            // Zutabe berria gehitu: irabazlea_id (User ID bat da)
            // 'nullable' da, hasieran inork ez duelako irabazi
            $table->foreignId('irabazlea_id')->nullable()->constrained('users')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('obras', function (Blueprint $table) {
            $table->dropForeign(['irabazlea_id']);
            $table->dropColumn('irabazlea_id');
        });
    }
};