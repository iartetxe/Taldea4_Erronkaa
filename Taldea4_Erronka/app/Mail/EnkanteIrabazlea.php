<?php

namespace App\Mail;

use App\Models\Obra;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EnkanteIrabazlea extends Mailable
{
    use Queueable, SerializesModels;

    public $obra; // Obra hemen gordeko dugu

    // Eraikitzaileak obra jasotzen du
    public function __construct(Obra $obra)
    {
        $this->obra = $obra;
    }

    // Emailaren izenburua
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Zorionak! Enkantea irabazi duzu - Artetxea',
        );
    }

    // Zein bista erabiliko duen
    public function content(): Content
    {
        return new Content(
            view: 'emails.enkante_irabazlea',
        );
    }
}