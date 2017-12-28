<?php

namespace App\Http\Controllers\API;

use App\Models\VistaPaciente;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Response;

/**
 * Class VistaPacienteController
 * @package App\Http\Controllers\API
 */

class VistaPacienteAPIController extends AppBaseController
{

    public function index(Request $request)
    {
        $vista = VistaPaciente::fromView()->get();

        return $this->sendResponse($vista->toArray(), 'VistaPacientes retrieved successfully');
    }

    public function show($id)
    {

        $vista = VistaPaciente::fromView()->where('id', '=', $id)->get();

        return $this->sendResponse($vista->toArray(), 'VistaPacientes retrieved successfully');
    }
}