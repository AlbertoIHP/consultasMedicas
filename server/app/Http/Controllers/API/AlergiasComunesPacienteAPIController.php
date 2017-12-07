<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateAlergiasComunesPacienteAPIRequest;
use App\Http\Requests\API\UpdateAlergiasComunesPacienteAPIRequest;
use App\Models\AlergiasComunesPaciente;
use App\Repositories\AlergiasComunesPacienteRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class AlergiasComunesPacienteController
 * @package App\Http\Controllers\API
 */

class AlergiasComunesPacienteAPIController extends AppBaseController
{
    /** @var  AlergiasComunesPacienteRepository */
    private $alergiasComunesPacienteRepository;

    public function __construct(AlergiasComunesPacienteRepository $alergiasComunesPacienteRepo)
    {
        $this->alergiasComunesPacienteRepository = $alergiasComunesPacienteRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/alergiasComunesPacientes",
     *      summary="Get a listing of the AlergiasComunesPacientes.",
     *      tags={"AlergiasComunesPaciente"},
     *      description="Get all AlergiasComunesPacientes",
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
     *                  @SWG\Items(ref="#/definitions/AlergiasComunesPaciente")
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
        $this->alergiasComunesPacienteRepository->pushCriteria(new RequestCriteria($request));
        $this->alergiasComunesPacienteRepository->pushCriteria(new LimitOffsetCriteria($request));
        $alergiasComunesPacientes = $this->alergiasComunesPacienteRepository->all();

        return $this->sendResponse($alergiasComunesPacientes->toArray(), 'Alergias Comunes Pacientes retrieved successfully');
    }

    /**
     * @param CreateAlergiasComunesPacienteAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/alergiasComunesPacientes",
     *      summary="Store a newly created AlergiasComunesPaciente in storage",
     *      tags={"AlergiasComunesPaciente"},
     *      description="Store AlergiasComunesPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="AlergiasComunesPaciente that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/AlergiasComunesPaciente")
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
     *                  ref="#/definitions/AlergiasComunesPaciente"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateAlergiasComunesPacienteAPIRequest $request)
    {
        $input = $request->all();

        $alergiasComunesPacientes = $this->alergiasComunesPacienteRepository->create($input);

        return $this->sendResponse($alergiasComunesPacientes->toArray(), 'Alergias Comunes Paciente saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/alergiasComunesPacientes/{id}",
     *      summary="Display the specified AlergiasComunesPaciente",
     *      tags={"AlergiasComunesPaciente"},
     *      description="Get AlergiasComunesPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of AlergiasComunesPaciente",
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
     *                  ref="#/definitions/AlergiasComunesPaciente"
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
        /** @var AlergiasComunesPaciente $alergiasComunesPaciente */
        $alergiasComunesPaciente = $this->alergiasComunesPacienteRepository->findWithoutFail($id);

        if (empty($alergiasComunesPaciente)) {
            return $this->sendError('Alergias Comunes Paciente not found');
        }

        return $this->sendResponse($alergiasComunesPaciente->toArray(), 'Alergias Comunes Paciente retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateAlergiasComunesPacienteAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/alergiasComunesPacientes/{id}",
     *      summary="Update the specified AlergiasComunesPaciente in storage",
     *      tags={"AlergiasComunesPaciente"},
     *      description="Update AlergiasComunesPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of AlergiasComunesPaciente",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="AlergiasComunesPaciente that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/AlergiasComunesPaciente")
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
     *                  ref="#/definitions/AlergiasComunesPaciente"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateAlergiasComunesPacienteAPIRequest $request)
    {
        $input = $request->all();

        /** @var AlergiasComunesPaciente $alergiasComunesPaciente */
        $alergiasComunesPaciente = $this->alergiasComunesPacienteRepository->findWithoutFail($id);

        if (empty($alergiasComunesPaciente)) {
            return $this->sendError('Alergias Comunes Paciente not found');
        }

        $alergiasComunesPaciente = $this->alergiasComunesPacienteRepository->update($input, $id);

        return $this->sendResponse($alergiasComunesPaciente->toArray(), 'AlergiasComunesPaciente updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/alergiasComunesPacientes/{id}",
     *      summary="Remove the specified AlergiasComunesPaciente from storage",
     *      tags={"AlergiasComunesPaciente"},
     *      description="Delete AlergiasComunesPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of AlergiasComunesPaciente",
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
        /** @var AlergiasComunesPaciente $alergiasComunesPaciente */
        $alergiasComunesPaciente = $this->alergiasComunesPacienteRepository->findWithoutFail($id);

        if (empty($alergiasComunesPaciente)) {
            return $this->sendError('Alergias Comunes Paciente not found');
        }

        $alergiasComunesPaciente->delete();

        return $this->sendResponse($id, 'Alergias Comunes Paciente deleted successfully');
    }
}
