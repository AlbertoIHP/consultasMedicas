<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateHabitosSexualesPacienteAPIRequest;
use App\Http\Requests\API\UpdateHabitosSexualesPacienteAPIRequest;
use App\Models\HabitosSexualesPaciente;
use App\Repositories\HabitosSexualesPacienteRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class HabitosSexualesPacienteController
 * @package App\Http\Controllers\API
 */

class HabitosSexualesPacienteAPIController extends AppBaseController
{
    /** @var  HabitosSexualesPacienteRepository */
    private $habitosSexualesPacienteRepository;

    public function __construct(HabitosSexualesPacienteRepository $habitosSexualesPacienteRepo)
    {
        $this->habitosSexualesPacienteRepository = $habitosSexualesPacienteRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/habitosSexualesPacientes",
     *      summary="Get a listing of the HabitosSexualesPacientes.",
     *      tags={"HabitosSexualesPaciente"},
     *      description="Get all HabitosSexualesPacientes",
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
     *                  @SWG\Items(ref="#/definitions/HabitosSexualesPaciente")
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
        $this->habitosSexualesPacienteRepository->pushCriteria(new RequestCriteria($request));
        $this->habitosSexualesPacienteRepository->pushCriteria(new LimitOffsetCriteria($request));
        $habitosSexualesPacientes = $this->habitosSexualesPacienteRepository->all();

        return $this->sendResponse($habitosSexualesPacientes->toArray(), 'Habitos Sexuales Pacientes retrieved successfully');
    }

    /**
     * @param CreateHabitosSexualesPacienteAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/habitosSexualesPacientes",
     *      summary="Store a newly created HabitosSexualesPaciente in storage",
     *      tags={"HabitosSexualesPaciente"},
     *      description="Store HabitosSexualesPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="HabitosSexualesPaciente that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/HabitosSexualesPaciente")
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
     *                  ref="#/definitions/HabitosSexualesPaciente"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateHabitosSexualesPacienteAPIRequest $request)
    {
        $input = $request->all();

        $habitosSexualesPacientes = $this->habitosSexualesPacienteRepository->create($input);

        return $this->sendResponse($habitosSexualesPacientes->toArray(), 'Habitos Sexuales Paciente saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/habitosSexualesPacientes/{id}",
     *      summary="Display the specified HabitosSexualesPaciente",
     *      tags={"HabitosSexualesPaciente"},
     *      description="Get HabitosSexualesPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of HabitosSexualesPaciente",
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
     *                  ref="#/definitions/HabitosSexualesPaciente"
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
        /** @var HabitosSexualesPaciente $habitosSexualesPaciente */
        $habitosSexualesPaciente = $this->habitosSexualesPacienteRepository->findWithoutFail($id);

        if (empty($habitosSexualesPaciente)) {
            return $this->sendError('Habitos Sexuales Paciente not found');
        }

        return $this->sendResponse($habitosSexualesPaciente->toArray(), 'Habitos Sexuales Paciente retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateHabitosSexualesPacienteAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/habitosSexualesPacientes/{id}",
     *      summary="Update the specified HabitosSexualesPaciente in storage",
     *      tags={"HabitosSexualesPaciente"},
     *      description="Update HabitosSexualesPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of HabitosSexualesPaciente",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="HabitosSexualesPaciente that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/HabitosSexualesPaciente")
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
     *                  ref="#/definitions/HabitosSexualesPaciente"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateHabitosSexualesPacienteAPIRequest $request)
    {
        $input = $request->all();

        /** @var HabitosSexualesPaciente $habitosSexualesPaciente */
        $habitosSexualesPaciente = $this->habitosSexualesPacienteRepository->findWithoutFail($id);

        if (empty($habitosSexualesPaciente)) {
            return $this->sendError('Habitos Sexuales Paciente not found');
        }

        $habitosSexualesPaciente = $this->habitosSexualesPacienteRepository->update($input, $id);

        return $this->sendResponse($habitosSexualesPaciente->toArray(), 'HabitosSexualesPaciente updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/habitosSexualesPacientes/{id}",
     *      summary="Remove the specified HabitosSexualesPaciente from storage",
     *      tags={"HabitosSexualesPaciente"},
     *      description="Delete HabitosSexualesPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of HabitosSexualesPaciente",
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
        /** @var HabitosSexualesPaciente $habitosSexualesPaciente */
        $habitosSexualesPaciente = $this->habitosSexualesPacienteRepository->findWithoutFail($id);

        if (empty($habitosSexualesPaciente)) {
            return $this->sendError('Habitos Sexuales Paciente not found');
        }

        $habitosSexualesPaciente->delete();

        return $this->sendResponse($id, 'Habitos Sexuales Paciente deleted successfully');
    }
}
