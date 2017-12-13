<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateVacunasPacienteAPIRequest;
use App\Http\Requests\API\UpdateVacunasPacienteAPIRequest;
use App\Models\VacunasPaciente;
use App\Repositories\VacunasPacienteRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class VacunasPacienteController
 * @package App\Http\Controllers\API
 */

class VacunasPacienteAPIController extends AppBaseController
{
    /** @var  VacunasPacienteRepository */
    private $vacunasPacienteRepository;

    public function __construct(VacunasPacienteRepository $vacunasPacienteRepo)
    {
        $this->vacunasPacienteRepository = $vacunasPacienteRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/vacunasPacientes",
     *      summary="Get a listing of the VacunasPacientes.",
     *      tags={"VacunasPaciente"},
     *      description="Get all VacunasPacientes",
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
     *                  @SWG\Items(ref="#/definitions/VacunasPaciente")
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
        $this->vacunasPacienteRepository->pushCriteria(new RequestCriteria($request));
        $this->vacunasPacienteRepository->pushCriteria(new LimitOffsetCriteria($request));
        $vacunasPacientes = $this->vacunasPacienteRepository->all();

        return $this->sendResponse($vacunasPacientes->toArray(), 'Vacunas Pacientes retrieved successfully');
    }

    /**
     * @param CreateVacunasPacienteAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/vacunasPacientes",
     *      summary="Store a newly created VacunasPaciente in storage",
     *      tags={"VacunasPaciente"},
     *      description="Store VacunasPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="VacunasPaciente that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/VacunasPaciente")
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
     *                  ref="#/definitions/VacunasPaciente"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateVacunasPacienteAPIRequest $request)
    {
        $input = $request->all();

        $vacunasPacientes = $this->vacunasPacienteRepository->create($input);

        return $this->sendResponse($vacunasPacientes->toArray(), 'Vacunas Paciente saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/vacunasPacientes/{id}",
     *      summary="Display the specified VacunasPaciente",
     *      tags={"VacunasPaciente"},
     *      description="Get VacunasPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of VacunasPaciente",
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
     *                  ref="#/definitions/VacunasPaciente"
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
        /** @var VacunasPaciente $vacunasPaciente */
        $vacunasPaciente = $this->vacunasPacienteRepository->findWithoutFail($id);

        if (empty($vacunasPaciente)) {
            return $this->sendError('Vacunas Paciente not found');
        }

        return $this->sendResponse($vacunasPaciente->toArray(), 'Vacunas Paciente retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateVacunasPacienteAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/vacunasPacientes/{id}",
     *      summary="Update the specified VacunasPaciente in storage",
     *      tags={"VacunasPaciente"},
     *      description="Update VacunasPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of VacunasPaciente",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="VacunasPaciente that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/VacunasPaciente")
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
     *                  ref="#/definitions/VacunasPaciente"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateVacunasPacienteAPIRequest $request)
    {
        $input = $request->all();

        /** @var VacunasPaciente $vacunasPaciente */
        $vacunasPaciente = $this->vacunasPacienteRepository->findWithoutFail($id);

        if (empty($vacunasPaciente)) {
            return $this->sendError('Vacunas Paciente not found');
        }

        $vacunasPaciente = $this->vacunasPacienteRepository->update($input, $id);

        return $this->sendResponse($vacunasPaciente->toArray(), 'VacunasPaciente updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/vacunasPacientes/{id}",
     *      summary="Remove the specified VacunasPaciente from storage",
     *      tags={"VacunasPaciente"},
     *      description="Delete VacunasPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of VacunasPaciente",
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
        /** @var VacunasPaciente $vacunasPaciente */
        $vacunasPaciente = $this->vacunasPacienteRepository->findWithoutFail($id);

        if (empty($vacunasPaciente)) {
            return $this->sendError('Vacunas Paciente not found');
        }

        $vacunasPaciente->delete();

        return $this->sendResponse($id, 'Vacunas Paciente deleted successfully');
    }
}
