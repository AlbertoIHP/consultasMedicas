<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateAlergiasMedicamentosPacienteAPIRequest;
use App\Http\Requests\API\UpdateAlergiasMedicamentosPacienteAPIRequest;
use App\Models\AlergiasMedicamentosPaciente;
use App\Repositories\AlergiasMedicamentosPacienteRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class AlergiasMedicamentosPacienteController
 * @package App\Http\Controllers\API
 */

class AlergiasMedicamentosPacienteAPIController extends AppBaseController
{
    /** @var  AlergiasMedicamentosPacienteRepository */
    private $alergiasMedicamentosPacienteRepository;

    public function __construct(AlergiasMedicamentosPacienteRepository $alergiasMedicamentosPacienteRepo)
    {
        $this->alergiasMedicamentosPacienteRepository = $alergiasMedicamentosPacienteRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/alergiasMedicamentosPacientes",
     *      summary="Get a listing of the AlergiasMedicamentosPacientes.",
     *      tags={"AlergiasMedicamentosPaciente"},
     *      description="Get all AlergiasMedicamentosPacientes",
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
     *                  @SWG\Items(ref="#/definitions/AlergiasMedicamentosPaciente")
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
        $this->alergiasMedicamentosPacienteRepository->pushCriteria(new RequestCriteria($request));
        $this->alergiasMedicamentosPacienteRepository->pushCriteria(new LimitOffsetCriteria($request));
        $alergiasMedicamentosPacientes = $this->alergiasMedicamentosPacienteRepository->all();

        return $this->sendResponse($alergiasMedicamentosPacientes->toArray(), 'Alergias Medicamentos Pacientes retrieved successfully');
    }

    /**
     * @param CreateAlergiasMedicamentosPacienteAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/alergiasMedicamentosPacientes",
     *      summary="Store a newly created AlergiasMedicamentosPaciente in storage",
     *      tags={"AlergiasMedicamentosPaciente"},
     *      description="Store AlergiasMedicamentosPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="AlergiasMedicamentosPaciente that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/AlergiasMedicamentosPaciente")
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
     *                  ref="#/definitions/AlergiasMedicamentosPaciente"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateAlergiasMedicamentosPacienteAPIRequest $request)
    {
        $input = $request->all();

        $alergiasMedicamentosPacientes = $this->alergiasMedicamentosPacienteRepository->create($input);

        return $this->sendResponse($alergiasMedicamentosPacientes->toArray(), 'Alergias Medicamentos Paciente saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/alergiasMedicamentosPacientes/{id}",
     *      summary="Display the specified AlergiasMedicamentosPaciente",
     *      tags={"AlergiasMedicamentosPaciente"},
     *      description="Get AlergiasMedicamentosPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of AlergiasMedicamentosPaciente",
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
     *                  ref="#/definitions/AlergiasMedicamentosPaciente"
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
        /** @var AlergiasMedicamentosPaciente $alergiasMedicamentosPaciente */
        $alergiasMedicamentosPaciente = $this->alergiasMedicamentosPacienteRepository->findWithoutFail($id);

        if (empty($alergiasMedicamentosPaciente)) {
            return $this->sendError('Alergias Medicamentos Paciente not found');
        }

        return $this->sendResponse($alergiasMedicamentosPaciente->toArray(), 'Alergias Medicamentos Paciente retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateAlergiasMedicamentosPacienteAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/alergiasMedicamentosPacientes/{id}",
     *      summary="Update the specified AlergiasMedicamentosPaciente in storage",
     *      tags={"AlergiasMedicamentosPaciente"},
     *      description="Update AlergiasMedicamentosPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of AlergiasMedicamentosPaciente",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="AlergiasMedicamentosPaciente that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/AlergiasMedicamentosPaciente")
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
     *                  ref="#/definitions/AlergiasMedicamentosPaciente"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateAlergiasMedicamentosPacienteAPIRequest $request)
    {
        $input = $request->all();

        /** @var AlergiasMedicamentosPaciente $alergiasMedicamentosPaciente */
        $alergiasMedicamentosPaciente = $this->alergiasMedicamentosPacienteRepository->findWithoutFail($id);

        if (empty($alergiasMedicamentosPaciente)) {
            return $this->sendError('Alergias Medicamentos Paciente not found');
        }

        $alergiasMedicamentosPaciente = $this->alergiasMedicamentosPacienteRepository->update($input, $id);

        return $this->sendResponse($alergiasMedicamentosPaciente->toArray(), 'AlergiasMedicamentosPaciente updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/alergiasMedicamentosPacientes/{id}",
     *      summary="Remove the specified AlergiasMedicamentosPaciente from storage",
     *      tags={"AlergiasMedicamentosPaciente"},
     *      description="Delete AlergiasMedicamentosPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of AlergiasMedicamentosPaciente",
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
        /** @var AlergiasMedicamentosPaciente $alergiasMedicamentosPaciente */
        $alergiasMedicamentosPaciente = $this->alergiasMedicamentosPacienteRepository->findWithoutFail($id);

        if (empty($alergiasMedicamentosPaciente)) {
            return $this->sendError('Alergias Medicamentos Paciente not found');
        }

        $alergiasMedicamentosPaciente->delete();

        return $this->sendResponse($id, 'Alergias Medicamentos Paciente deleted successfully');
    }
}
