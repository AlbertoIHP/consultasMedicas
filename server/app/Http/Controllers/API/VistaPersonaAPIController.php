<?php

namespace App\Http\Controllers\API;

use App\Models\VistaPersona;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Response;

/**
 * Class VistaPersonaController
 * @package App\Http\Controllers\API
 */

class VistaPersonaAPIController extends AppBaseController
{
    public function index(Request $request)
    {
        $vista = VistaPersona::fromView()->get();

        return $this->sendResponse($vista->toArray(), 'VistaPersona retrieved successfully');
    }

    public function show($id)
    {

        $vista = VistaPersona::fromView()->where('id', '=', $id)->get();

        return $this->sendResponse($vista->toArray(), 'VistaPersona retrieved successfully');
    }
}
