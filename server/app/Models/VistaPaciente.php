<?php

namespace App\Models;

use Eloquent as Model;

class VistaPaciente extends Model
{

    public function scopeFromView($query)
    {
        return $query->from('VistaPaciente');
    }
}