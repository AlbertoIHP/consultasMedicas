<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateCitaAPIRequest;
use App\Http\Requests\API\UpdateCitaAPIRequest;
use App\Models\Cita;
use App\Repositories\CitaRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class CitaController
 * @package App\Http\Controllers\API
 */

class CitaAPIController extends AppBaseController
{
    /** @var  CitaRepository */
    private $citaRepository;

    public function __construct(CitaRepository $citaRepo)
    {
        $this->citaRepository = $citaRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/citas",
     *      summary="Get a listing of the Citas.",
     *      tags={"Cita"},
     *      description="Get all Citas",
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
     *                  @SWG\Items(ref="#/definitions/Cita")
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
        $this->citaRepository->pushCriteria(new RequestCriteria($request));
        $this->citaRepository->pushCriteria(new LimitOffsetCriteria($request));
        $citas = $this->citaRepository->all();

        return $this->sendResponse($citas->toArray(), 'Citas retrieved successfully');
    }

    /**
     * @param CreateCitaAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/citas",
     *      summary="Store a newly created Cita in storage",
     *      tags={"Cita"},
     *      description="Store Cita",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Cita that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Cita")
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
     *                  ref="#/definitions/Cita"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateCitaAPIRequest $request)
    {
        $input = $request->all();

        $citas = $this->citaRepository->create($input);

        return $this->sendResponse($citas->toArray(), 'Cita saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/citas/{id}",
     *      summary="Display the specified Cita",
     *      tags={"Cita"},
     *      description="Get Cita",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Cita",
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
     *                  ref="#/definitions/Cita"
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
        /** @var Cita $cita */
        $cita = $this->citaRepository->findWithoutFail($id);

        if (empty($cita)) {
            return $this->sendError('Cita not found');
        }

        return $this->sendResponse($cita->toArray(), 'Cita retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateCitaAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/citas/{id}",
     *      summary="Update the specified Cita in storage",
     *      tags={"Cita"},
     *      description="Update Cita",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Cita",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Cita that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Cita")
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
     *                  ref="#/definitions/Cita"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateCitaAPIRequest $request)
    {
        $input = $request->all();

        /** @var Cita $cita */
        $cita = $this->citaRepository->findWithoutFail($id);

        if (empty($cita)) {
            return $this->sendError('Cita not found');
        }

        $cita = $this->citaRepository->update($input, $id);

        return $this->sendResponse($cita->toArray(), 'Cita updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/citas/{id}",
     *      summary="Remove the specified Cita from storage",
     *      tags={"Cita"},
     *      description="Delete Cita",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Cita",
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
        /** @var Cita $cita */
        $cita = $this->citaRepository->findWithoutFail($id);

        if (empty($cita)) {
            return $this->sendError('Cita not found');
        }

        $cita->delete();

        return $this->sendResponse($id, 'Cita deleted successfully');
    }
}
