<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateAlergiasPacienteAPIRequest;
use App\Http\Requests\API\UpdateAlergiasPacienteAPIRequest;
use App\Models\AlergiasPaciente;
use App\Repositories\AlergiasPacienteRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class AlergiasPacienteController
 * @package App\Http\Controllers\API
 */

class AlergiasPacienteAPIController extends AppBaseController
{
    /** @var  AlergiasPacienteRepository */
    private $alergiasPacienteRepository;

    public function __construct(AlergiasPacienteRepository $alergiasPacienteRepo)
    {
        $this->alergiasPacienteRepository = $alergiasPacienteRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/alergiasPacientes",
     *      summary="Get a listing of the AlergiasPacientes.",
     *      tags={"AlergiasPaciente"},
     *      description="Get all AlergiasPacientes",
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
     *                  @SWG\Items(ref="#/definitions/AlergiasPaciente")
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
        $this->alergiasPacienteRepository->pushCriteria(new RequestCriteria($request));
        $this->alergiasPacienteRepository->pushCriteria(new LimitOffsetCriteria($request));
        $alergiasPacientes = $this->alergiasPacienteRepository->all();

        return $this->sendResponse($alergiasPacientes->toArray(), 'Alergias Pacientes retrieved successfully');
    }

    /**
     * @param CreateAlergiasPacienteAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/alergiasPacientes",
     *      summary="Store a newly created AlergiasPaciente in storage",
     *      tags={"AlergiasPaciente"},
     *      description="Store AlergiasPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="AlergiasPaciente that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/AlergiasPaciente")
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
     *                  ref="#/definitions/AlergiasPaciente"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateAlergiasPacienteAPIRequest $request)
    {
        $input = $request->all();

        $alergiasPacientes = $this->alergiasPacienteRepository->create($input);

        return $this->sendResponse($alergiasPacientes->toArray(), 'Alergias Paciente saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/alergiasPacientes/{id}",
     *      summary="Display the specified AlergiasPaciente",
     *      tags={"AlergiasPaciente"},
     *      description="Get AlergiasPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of AlergiasPaciente",
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
     *                  ref="#/definitions/AlergiasPaciente"
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
        /** @var AlergiasPaciente $alergiasPaciente */
        $alergiasPaciente = $this->alergiasPacienteRepository->findWithoutFail($id);

        if (empty($alergiasPaciente)) {
            return $this->sendError('Alergias Paciente not found');
        }

        return $this->sendResponse($alergiasPaciente->toArray(), 'Alergias Paciente retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateAlergiasPacienteAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/alergiasPacientes/{id}",
     *      summary="Update the specified AlergiasPaciente in storage",
     *      tags={"AlergiasPaciente"},
     *      description="Update AlergiasPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of AlergiasPaciente",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="AlergiasPaciente that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/AlergiasPaciente")
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
     *                  ref="#/definitions/AlergiasPaciente"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateAlergiasPacienteAPIRequest $request)
    {
        $input = $request->all();

        /** @var AlergiasPaciente $alergiasPaciente */
        $alergiasPaciente = $this->alergiasPacienteRepository->findWithoutFail($id);

        if (empty($alergiasPaciente)) {
            return $this->sendError('Alergias Paciente not found');
        }

        $alergiasPaciente = $this->alergiasPacienteRepository->update($input, $id);

        return $this->sendResponse($alergiasPaciente->toArray(), 'AlergiasPaciente updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/alergiasPacientes/{id}",
     *      summary="Remove the specified AlergiasPaciente from storage",
     *      tags={"AlergiasPaciente"},
     *      description="Delete AlergiasPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of AlergiasPaciente",
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
        /** @var AlergiasPaciente $alergiasPaciente */
        $alergiasPaciente = $this->alergiasPacienteRepository->findWithoutFail($id);

        if (empty($alergiasPaciente)) {
            return $this->sendError('Alergias Paciente not found');
        }

        $alergiasPaciente->delete();

        return $this->sendResponse($id, 'Alergias Paciente deleted successfully');
    }
}
