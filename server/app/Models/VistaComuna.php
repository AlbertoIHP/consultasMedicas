<?php

namespace App\Models;

use Eloquent as Model;

class VistaComuna extends Model
{
    public function scopeFromView($query)
    {
        return $query->from('VistaComuna');
    }
}