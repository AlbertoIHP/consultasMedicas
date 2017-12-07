<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateEnfermedadesCronicasPacienteAPIRequest;
use App\Http\Requests\API\UpdateEnfermedadesCronicasPacienteAPIRequest;
use App\Models\EnfermedadesCronicasPaciente;
use App\Repositories\EnfermedadesCronicasPacienteRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class EnfermedadesCronicasPacienteController
 * @package App\Http\Controllers\API
 */

class EnfermedadesCronicasPacienteAPIController extends AppBaseController
{
    /** @var  EnfermedadesCronicasPacienteRepository */
    private $enfermedadesCronicasPacienteRepository;

    public function __construct(EnfermedadesCronicasPacienteRepository $enfermedadesCronicasPacienteRepo)
    {
        $this->enfermedadesCronicasPacienteRepository = $enfermedadesCronicasPacienteRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/enfermedadesCronicasPacientes",
     *      summary="Get a listing of the EnfermedadesCronicasPacientes.",
     *      tags={"EnfermedadesCronicasPaciente"},
     *      description="Get all EnfermedadesCronicasPacientes",
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
     *                  @SWG\Items(ref="#/definitions/EnfermedadesCronicasPaciente")
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
        $this->enfermedadesCronicasPacienteRepository->pushCriteria(new RequestCriteria($request));
        $this->enfermedadesCronicasPacienteRepository->pushCriteria(new LimitOffsetCriteria($request));
        $enfermedadesCronicasPacientes = $this->enfermedadesCronicasPacienteRepository->all();

        return $this->sendResponse($enfermedadesCronicasPacientes->toArray(), 'Enfermedades Cronicas Pacientes retrieved successfully');
    }

    /**
     * @param CreateEnfermedadesCronicasPacienteAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/enfermedadesCronicasPacientes",
     *      summary="Store a newly created EnfermedadesCronicasPaciente in storage",
     *      tags={"EnfermedadesCronicasPaciente"},
     *      description="Store EnfermedadesCronicasPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="EnfermedadesCronicasPaciente that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/EnfermedadesCronicasPaciente")
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
     *                  ref="#/definitions/EnfermedadesCronicasPaciente"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateEnfermedadesCronicasPacienteAPIRequest $request)
    {
        $input = $request->all();

        $enfermedadesCronicasPacientes = $this->enfermedadesCronicasPacienteRepository->create($input);

        return $this->sendResponse($enfermedadesCronicasPacientes->toArray(), 'Enfermedades Cronicas Paciente saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/enfermedadesCronicasPacientes/{id}",
     *      summary="Display the specified EnfermedadesCronicasPaciente",
     *      tags={"EnfermedadesCronicasPaciente"},
     *      description="Get EnfermedadesCronicasPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of EnfermedadesCronicasPaciente",
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
     *                  ref="#/definitions/EnfermedadesCronicasPaciente"
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
        /** @var EnfermedadesCronicasPaciente $enfermedadesCronicasPaciente */
        $enfermedadesCronicasPaciente = $this->enfermedadesCronicasPacienteRepository->findWithoutFail($id);

        if (empty($enfermedadesCronicasPaciente)) {
            return $this->sendError('Enfermedades Cronicas Paciente not found');
        }

        return $this->sendResponse($enfermedadesCronicasPaciente->toArray(), 'Enfermedades Cronicas Paciente retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateEnfermedadesCronicasPacienteAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/enfermedadesCronicasPacientes/{id}",
     *      summary="Update the specified EnfermedadesCronicasPaciente in storage",
     *      tags={"EnfermedadesCronicasPaciente"},
     *      description="Update EnfermedadesCronicasPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of EnfermedadesCronicasPaciente",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="EnfermedadesCronicasPaciente that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/EnfermedadesCronicasPaciente")
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
     *                  ref="#/definitions/EnfermedadesCronicasPaciente"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateEnfermedadesCronicasPacienteAPIRequest $request)
    {
        $input = $request->all();

        /** @var EnfermedadesCronicasPaciente $enfermedadesCronicasPaciente */
        $enfermedadesCronicasPaciente = $this->enfermedadesCronicasPacienteRepository->findWithoutFail($id);

        if (empty($enfermedadesCronicasPaciente)) {
            return $this->sendError('Enfermedades Cronicas Paciente not found');
        }

        $enfermedadesCronicasPaciente = $this->enfermedadesCronicasPacienteRepository->update($input, $id);

        return $this->sendResponse($enfermedadesCronicasPaciente->toArray(), 'EnfermedadesCronicasPaciente updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/enfermedadesCronicasPacientes/{id}",
     *      summary="Remove the specified EnfermedadesCronicasPaciente from storage",
     *      tags={"EnfermedadesCronicasPaciente"},
     *      description="Delete EnfermedadesCronicasPaciente",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of EnfermedadesCronicasPaciente",
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
        /** @var EnfermedadesCronicasPaciente $enfermedadesCronicasPaciente */
        $enfermedadesCronicasPaciente = $this->enfermedadesCronicasPacienteRepository->findWithoutFail($id);

        if (empty($enfermedadesCronicasPaciente)) {
            return $this->sendError('Enfermedades Cronicas Paciente not found');
        }

        $enfermedadesCronicasPaciente->delete();

        return $this->sendResponse($id, 'Enfermedades Cronicas Paciente deleted successfully');
    }
}
