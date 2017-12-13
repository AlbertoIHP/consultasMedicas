<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateEnfermedadCronicaAPIRequest;
use App\Http\Requests\API\UpdateEnfermedadCronicaAPIRequest;
use App\Models\EnfermedadCronica;
use App\Repositories\EnfermedadCronicaRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class EnfermedadCronicaController
 * @package App\Http\Controllers\API
 */

class EnfermedadCronicaAPIController extends AppBaseController
{
    /** @var  EnfermedadCronicaRepository */
    private $enfermedadCronicaRepository;

    public function __construct(EnfermedadCronicaRepository $enfermedadCronicaRepo)
    {
        $this->enfermedadCronicaRepository = $enfermedadCronicaRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/enfermedadCronicas",
     *      summary="Get a listing of the EnfermedadCronicas.",
     *      tags={"EnfermedadCronica"},
     *      description="Get all EnfermedadCronicas",
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
     *                  @SWG\Items(ref="#/definitions/EnfermedadCronica")
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
        $this->enfermedadCronicaRepository->pushCriteria(new RequestCriteria($request));
        $this->enfermedadCronicaRepository->pushCriteria(new LimitOffsetCriteria($request));
        $enfermedadCronicas = $this->enfermedadCronicaRepository->all();

        return $this->sendResponse($enfermedadCronicas->toArray(), 'Enfermedad Cronicas retrieved successfully');
    }

    /**
     * @param CreateEnfermedadCronicaAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/enfermedadCronicas",
     *      summary="Store a newly created EnfermedadCronica in storage",
     *      tags={"EnfermedadCronica"},
     *      description="Store EnfermedadCronica",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="EnfermedadCronica that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/EnfermedadCronica")
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
     *                  ref="#/definitions/EnfermedadCronica"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateEnfermedadCronicaAPIRequest $request)
    {
        $input = $request->all();

        $enfermedadCronicas = $this->enfermedadCronicaRepository->create($input);

        return $this->sendResponse($enfermedadCronicas->toArray(), 'Enfermedad Cronica saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/enfermedadCronicas/{id}",
     *      summary="Display the specified EnfermedadCronica",
     *      tags={"EnfermedadCronica"},
     *      description="Get EnfermedadCronica",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of EnfermedadCronica",
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
     *                  ref="#/definitions/EnfermedadCronica"
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
        /** @var EnfermedadCronica $enfermedadCronica */
        $enfermedadCronica = $this->enfermedadCronicaRepository->findWithoutFail($id);

        if (empty($enfermedadCronica)) {
            return $this->sendError('Enfermedad Cronica not found');
        }

        return $this->sendResponse($enfermedadCronica->toArray(), 'Enfermedad Cronica retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateEnfermedadCronicaAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/enfermedadCronicas/{id}",
     *      summary="Update the specified EnfermedadCronica in storage",
     *      tags={"EnfermedadCronica"},
     *      description="Update EnfermedadCronica",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of EnfermedadCronica",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="EnfermedadCronica that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/EnfermedadCronica")
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
     *                  ref="#/definitions/EnfermedadCronica"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateEnfermedadCronicaAPIRequest $request)
    {
        $input = $request->all();

        /** @var EnfermedadCronica $enfermedadCronica */
        $enfermedadCronica = $this->enfermedadCronicaRepository->findWithoutFail($id);

        if (empty($enfermedadCronica)) {
            return $this->sendError('Enfermedad Cronica not found');
        }

        $enfermedadCronica = $this->enfermedadCronicaRepository->update($input, $id);

        return $this->sendResponse($enfermedadCronica->toArray(), 'EnfermedadCronica updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/enfermedadCronicas/{id}",
     *      summary="Remove the specified EnfermedadCronica from storage",
     *      tags={"EnfermedadCronica"},
     *      description="Delete EnfermedadCronica",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of EnfermedadCronica",
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
        /** @var EnfermedadCronica $enfermedadCronica */
        $enfermedadCronica = $this->enfermedadCronicaRepository->findWithoutFail($id);

        if (empty($enfermedadCronica)) {
            return $this->sendError('Enfermedad Cronica not found');
        }

        $enfermedadCronica->delete();

        return $this->sendResponse($id, 'Enfermedad Cronica deleted successfully');
    }
}
