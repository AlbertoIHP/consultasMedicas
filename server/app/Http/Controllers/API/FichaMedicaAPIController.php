<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateFichaMedicaAPIRequest;
use App\Http\Requests\API\UpdateFichaMedicaAPIRequest;
use App\Models\FichaMedica;
use App\Repositories\FichaMedicaRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class FichaMedicaController
 * @package App\Http\Controllers\API
 */

class FichaMedicaAPIController extends AppBaseController
{
    /** @var  FichaMedicaRepository */
    private $fichaMedicaRepository;

    public function __construct(FichaMedicaRepository $fichaMedicaRepo)
    {
        $this->fichaMedicaRepository = $fichaMedicaRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/fichaMedicas",
     *      summary="Get a listing of the FichaMedicas.",
     *      tags={"FichaMedica"},
     *      description="Get all FichaMedicas",
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
     *                  @SWG\Items(ref="#/definitions/FichaMedica")
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
        $this->fichaMedicaRepository->pushCriteria(new RequestCriteria($request));
        $this->fichaMedicaRepository->pushCriteria(new LimitOffsetCriteria($request));
        $fichaMedicas = $this->fichaMedicaRepository->all();

        return $this->sendResponse($fichaMedicas->toArray(), 'Ficha Medicas retrieved successfully');
    }

    /**
     * @param CreateFichaMedicaAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/fichaMedicas",
     *      summary="Store a newly created FichaMedica in storage",
     *      tags={"FichaMedica"},
     *      description="Store FichaMedica",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="FichaMedica that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/FichaMedica")
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
     *                  ref="#/definitions/FichaMedica"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateFichaMedicaAPIRequest $request)
    {
        $input = $request->all();

        $fichaMedicas = $this->fichaMedicaRepository->create($input);

        return $this->sendResponse($fichaMedicas->toArray(), 'Ficha Medica saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/fichaMedicas/{id}",
     *      summary="Display the specified FichaMedica",
     *      tags={"FichaMedica"},
     *      description="Get FichaMedica",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of FichaMedica",
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
     *                  ref="#/definitions/FichaMedica"
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
        /** @var FichaMedica $fichaMedica */
        $fichaMedica = $this->fichaMedicaRepository->findWithoutFail($id);

        if (empty($fichaMedica)) {
            return $this->sendError('Ficha Medica not found');
        }

        return $this->sendResponse($fichaMedica->toArray(), 'Ficha Medica retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateFichaMedicaAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/fichaMedicas/{id}",
     *      summary="Update the specified FichaMedica in storage",
     *      tags={"FichaMedica"},
     *      description="Update FichaMedica",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of FichaMedica",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="FichaMedica that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/FichaMedica")
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
     *                  ref="#/definitions/FichaMedica"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateFichaMedicaAPIRequest $request)
    {
        $input = $request->all();

        /** @var FichaMedica $fichaMedica */
        $fichaMedica = $this->fichaMedicaRepository->findWithoutFail($id);

        if (empty($fichaMedica)) {
            return $this->sendError('Ficha Medica not found');
        }

        $fichaMedica = $this->fichaMedicaRepository->update($input, $id);

        return $this->sendResponse($fichaMedica->toArray(), 'FichaMedica updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/fichaMedicas/{id}",
     *      summary="Remove the specified FichaMedica from storage",
     *      tags={"FichaMedica"},
     *      description="Delete FichaMedica",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of FichaMedica",
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
        /** @var FichaMedica $fichaMedica */
        $fichaMedica = $this->fichaMedicaRepository->findWithoutFail($id);

        if (empty($fichaMedica)) {
            return $this->sendError('Ficha Medica not found');
        }

        $fichaMedica->delete();

        return $this->sendResponse($id, 'Ficha Medica deleted successfully');
    }
}
