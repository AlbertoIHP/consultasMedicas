<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateHabitosPacienteAPIRequest;
use App\Http\Requests\API\UpdateHabitosPacienteAPIRequest;
use App\Models\HabitosPaciente;
use App\Repositories\HabitosPacienteRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class HabitosPacienteController
 * @package App\Http\Controllers\API
 */

class HabitosPacienteAPIController extends AppBaseController
{
    /** @var  HabitosPacienteRepository */
    private $habitosPacienteRepository;

    public function __construct(HabitosPacienteRepository $habitosPacienteRepo)
    {
        $this->habitosPacienteRepository = $habitosPacienteRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/habitosPacientes",
     *      summary="Get a listing of the HabitosPacientes.",
     *      tags={"HabitosPaciente"},
     *      description="Get all HabitosPacientes",
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
     *                  @SWG\Items(ref="#/definitions/HabitosPaciente")
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
        $this->habitosPacienteRepository->pushCriteria(new RequestCriteria($request));
        $this->habitosPacienteRepository->pushCriteria(new LimitOffsetCriteria($request));
        $habitosPacientes = $this->habitosPacienteRepository->all();

        return $this->sendResponse($habitosPacientes->toArray(), 'Habitos Pacientes retrieved successfully');
    }

    /**
     * @param CreateHabitosPacienteAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/habitosPacientes",
     *      summary="Store a newly created HabitosPaciente in storage",
     *      tags={"HabitosPaciente"},
     *      description="Store HabitosPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="HabitosPaciente that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/HabitosPaciente")
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
     *                  ref="#/definitions/HabitosPaciente"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateHabitosPacienteAPIRequest $request)
    {
        $input = $request->all();

        $habitosPacientes = $this->habitosPacienteRepository->create($input);

        return $this->sendResponse($habitosPacientes->toArray(), 'Habitos Paciente saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/habitosPacientes/{id}",
     *      summary="Display the specified HabitosPaciente",
     *      tags={"HabitosPaciente"},
     *      description="Get HabitosPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of HabitosPaciente",
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
     *                  ref="#/definitions/HabitosPaciente"
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
        /** @var HabitosPaciente $habitosPaciente */
        $habitosPaciente = $this->habitosPacienteRepository->findWithoutFail($id);

        if (empty($habitosPaciente)) {
            return $this->sendError('Habitos Paciente not found');
        }

        return $this->sendResponse($habitosPaciente->toArray(), 'Habitos Paciente retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateHabitosPacienteAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/habitosPacientes/{id}",
     *      summary="Update the specified HabitosPaciente in storage",
     *      tags={"HabitosPaciente"},
     *      description="Update HabitosPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of HabitosPaciente",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="HabitosPaciente that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/HabitosPaciente")
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
     *                  ref="#/definitions/HabitosPaciente"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateHabitosPacienteAPIRequest $request)
    {
        $input = $request->all();

        /** @var HabitosPaciente $habitosPaciente */
        $habitosPaciente = $this->habitosPacienteRepository->findWithoutFail($id);

        if (empty($habitosPaciente)) {
            return $this->sendError('Habitos Paciente not found');
        }

        $habitosPaciente = $this->habitosPacienteRepository->update($input, $id);

        return $this->sendResponse($habitosPaciente->toArray(), 'HabitosPaciente updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/habitosPacientes/{id}",
     *      summary="Remove the specified HabitosPaciente from storage",
     *      tags={"HabitosPaciente"},
     *      description="Delete HabitosPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of HabitosPaciente",
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
        /** @var HabitosPaciente $habitosPaciente */
        $habitosPaciente = $this->habitosPacienteRepository->findWithoutFail($id);

        if (empty($habitosPaciente)) {
            return $this->sendError('Habitos Paciente not found');
        }

        $habitosPaciente->delete();

        return $this->sendResponse($id, 'Habitos Paciente deleted successfully');
    }
}
