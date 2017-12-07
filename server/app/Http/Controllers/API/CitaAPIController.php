<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateCitaAPIRequest;
use App\Http\Requests\API\UpdateCitaAPIRequest;
use App\Models\Cita;
use App\Repositories\CitaRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;
use Illuminate\Support\Facades\DB;

//CORREO TIII
use Illuminate\Support\Facades\Mail;
use Input;

/**
 * Class CitaController
 * @package App\Http\Controllers\API
 */

class CitaAPIController extends AppBaseController
{
    /** @var  CitaRepository */
    private $citaRepository;

    public function __construct(CitaRepository $citaRepo)
    {
        $this->citaRepository = $citaRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/citas",
     *      summary="Get a listing of the Citas.",
     *      tags={"Cita"},
     *      description="Get all Citas",
     *      produces={"application/json"},
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  type="array",
     *                  @SWG\Items(ref="#/definitions/Cita")
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function index(Request $request)
    {
        $this->citaRepository->pushCriteria(new RequestCriteria($request));
        $this->citaRepository->pushCriteria(new LimitOffsetCriteria($request));
        $citas = $this->citaRepository->all();

        return $this->sendResponse($citas->toArray(), 'Citas retrieved successfully');
    }

    /**
     * @param CreateCitaAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/citas",
     *      summary="Store a newly created Cita in storage",
     *      tags={"Cita"},
     *      description="Store Cita",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Cita that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Cita")
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/Cita"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateCitaAPIRequest $request)
    {
        $input = $request->all();

        $citas = $this->citaRepository->create($input);

        //Nos quedamos con las ID de ambos elementos
        $idMedico = $citas['Medico_id'];
        $idPaciente = $citas['Paciente_id'];

        //Buscamos en la tabla Medico y Paciente, los registros con los id capturados y nos quedamos solo con la id de la persona asociada
        $Medico = DB::table('Medico')->where('id', $idMedico)->value('Persona_id');
        $Paciente = DB::table('Paciente')->where('id', $idPaciente)->value('Persona_id');

        $nombreMedico = DB::table('Persona')->where('id', $Medico)->value('nombre1') .' '. DB::table('Persona')->where('id', $Medico)->value('apellido1') ;

        $nombrePaciente = DB::table('Persona')->where('id', $Paciente)->value('nombre1') .' '. DB::table('Persona')->where('id', $Paciente)->value('apellido1');

        //Extraemos de la tabla Usuario el correo de ambos 
        $correoMedico = DB::table('Usuario')->where('Persona_id', $Medico)->value('email');
        $correoPaciente = DB::table('Usuario')->where('Persona_id', $Paciente)->value('email');


        //Enviamos un correo con la vista guardada en email-> avisoCita.blade.php, entregamos las variables
        //a la vista que son el nombre del medico, fecha y hora de la cita. Ademas con message
        //le damos un nombre al correo

        $hora = $citas['hora'];
        $fecha = $citas['fecha'];

        error_log($hora);
        error_log($fecha);

        //Correo para el MEDICO
        Mail::send('email.avisoCita', ['email' => $correoMedico, 'nombre' => $nombreMedico, 'fecha'=> $fecha, 'hora' => $hora ], function ($message) use ($correoMedico, $nombreMedico) {
            $message->to($correoMedico, $nombreMedico)->subject('Se ha agendado una cita');
        });


        // Correo para el PACIENTE
        Mail::send('email.avisoCita', ['email' => $correoPaciente, 'nombre' => $nombrePaciente, 'fecha'=> $fecha, 'hora' => $hora ], function ($message) use ($correoPaciente, $nombreMedico) { 
            $message->to( $correoPaciente, $correoPaciente)->subject('Se ha agendado una cita con '.$nombreMedico) ;
            
            });



        return $this->sendResponse($citas->toArray(), 'Cita saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/citas/{id}",
     *      summary="Display the specified Cita",
     *      tags={"Cita"},
     *      description="Get Cita",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Cita",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/Cita"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function show($id)
    {
        /** @var Cita $cita */
        $cita = $this->citaRepository->findWithoutFail($id);

        if (empty($cita)) {
            return $this->sendError('Cita not found');
        }

        return $this->sendResponse($cita->toArray(), 'Cita retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateCitaAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/citas/{id}",
     *      summary="Update the specified Cita in storage",
     *      tags={"Cita"},
     *      description="Update Cita",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Cita",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Cita that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Cita")
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/Cita"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateCitaAPIRequest $request)
    {
        $input = $request->all();

        /** @var Cita $cita */
        $cita = $this->citaRepository->findWithoutFail($id);

        if (empty($cita)) {
            return $this->sendError('Cita not found');
        }

        $cita = $this->citaRepository->update($input, $id);

        return $this->sendResponse($cita->toArray(), 'Cita updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/citas/{id}",
     *      summary="Remove the specified Cita from storage",
     *      tags={"Cita"},
     *      description="Delete Cita",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Cita",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  type="string"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function destroy($id)
    {
        /** @var Cita $cita */
        $cita = $this->citaRepository->findWithoutFail($id);

        if (empty($cita)) {
            return $this->sendError('Cita not found');
        }

        $cita->delete();

        return $this->sendResponse($id, 'Cita deleted successfully');
    }
}
