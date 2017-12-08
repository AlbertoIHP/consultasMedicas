<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePacienteAPIRequest;
use App\Http\Requests\API\UpdatePacienteAPIRequest;
use App\Models\Paciente;
use App\Repositories\PacienteRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class PacienteController
 * @package App\Http\Controllers\API
 */

class PacienteAPIController extends AppBaseController
{
    /** @var  PacienteRepository */
    private $pacienteRepository;

    public function __construct(PacienteRepository $pacienteRepo)
    {
        $this->pacienteRepository = $pacienteRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/pacientes",
     *      summary="Get a listing of the Pacientes.",
     *      tags={"Paciente"},
     *      description="Get all Pacientes",
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
     *                  @SWG\Items(ref="#/definitions/Paciente")
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
        $this->pacienteRepository->pushCriteria(new RequestCriteria($request));
        $this->pacienteRepository->pushCriteria(new LimitOffsetCriteria($request));
        $pacientes = $this->pacienteRepository->all();

        return $this->sendResponse($pacientes->toArray(), 'Pacientes retrieved successfully');
    }

    /**
     * @param CreatePacienteAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/pacientes",
     *      summary="Store a newly created Paciente in storage",
     *      tags={"Paciente"},
     *      description="Store Paciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Paciente that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Paciente")
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
     *                  ref="#/definitions/Paciente"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreatePacienteAPIRequest $request)
    {
        $input = $request->all();

        $pacientes = $this->pacienteRepository->create($input);

        return $this->sendResponse($pacientes->toArray(), 'Paciente saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/pacientes/{id}",
     *      summary="Display the specified Paciente",
     *      tags={"Paciente"},
     *      description="Get Paciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Paciente",
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
     *                  ref="#/definitions/Paciente"
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
        /** @var Paciente $paciente */
        $paciente = $this->pacienteRepository->findWithoutFail($id);

        if (empty($paciente)) {
            return $this->sendError('Paciente not found');
        }

        return $this->sendResponse($paciente->toArray(), 'Paciente retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdatePacienteAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/pacientes/{id}",
     *      summary="Update the specified Paciente in storage",
     *      tags={"Paciente"},
     *      description="Update Paciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Paciente",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Paciente that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Paciente")
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
     *                  ref="#/definitions/Paciente"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdatePacienteAPIRequest $request)
    {
        $input = $request->all();

        /** @var Paciente $paciente */
        $paciente = $this->pacienteRepository->findWithoutFail($id);

        if (empty($paciente)) {
            return $this->sendError('Paciente not found');
        }

        $paciente = $this->pacienteRepository->update($input, $id);

        return $this->sendResponse($paciente->toArray(), 'Paciente updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/pacientes/{id}",
     *      summary="Remove the specified Paciente from storage",
     *      tags={"Paciente"},
     *      description="Delete Paciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Paciente",
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
        /** @var Paciente $paciente */
        $paciente = $this->pacienteRepository->findWithoutFail($id);

        if (empty($paciente)) {
            return $this->sendError('Paciente not found');
        }

        $paciente->delete();

        return $this->sendResponse($id, 'Paciente deleted successfully');
    }
}
