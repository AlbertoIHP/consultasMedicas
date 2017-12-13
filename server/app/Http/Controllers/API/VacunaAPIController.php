<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateVacunaAPIRequest;
use App\Http\Requests\API\UpdateVacunaAPIRequest;
use App\Models\Vacuna;
use App\Repositories\VacunaRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class VacunaController
 * @package App\Http\Controllers\API
 */

class VacunaAPIController extends AppBaseController
{
    /** @var  VacunaRepository */
    private $vacunaRepository;

    public function __construct(VacunaRepository $vacunaRepo)
    {
        $this->vacunaRepository = $vacunaRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/vacunas",
     *      summary="Get a listing of the Vacunas.",
     *      tags={"Vacuna"},
     *      description="Get all Vacunas",
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
     *                  @SWG\Items(ref="#/definitions/Vacuna")
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
        $this->vacunaRepository->pushCriteria(new RequestCriteria($request));
        $this->vacunaRepository->pushCriteria(new LimitOffsetCriteria($request));
        $vacunas = $this->vacunaRepository->all();

        return $this->sendResponse($vacunas->toArray(), 'Vacunas retrieved successfully');
    }

    /**
     * @param CreateVacunaAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/vacunas",
     *      summary="Store a newly created Vacuna in storage",
     *      tags={"Vacuna"},
     *      description="Store Vacuna",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Vacuna that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Vacuna")
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
     *                  ref="#/definitions/Vacuna"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateVacunaAPIRequest $request)
    {
        $input = $request->all();

        $vacunas = $this->vacunaRepository->create($input);

        return $this->sendResponse($vacunas->toArray(), 'Vacuna saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/vacunas/{id}",
     *      summary="Display the specified Vacuna",
     *      tags={"Vacuna"},
     *      description="Get Vacuna",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Vacuna",
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
     *                  ref="#/definitions/Vacuna"
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
        /** @var Vacuna $vacuna */
        $vacuna = $this->vacunaRepository->findWithoutFail($id);

        if (empty($vacuna)) {
            return $this->sendError('Vacuna not found');
        }

        return $this->sendResponse($vacuna->toArray(), 'Vacuna retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateVacunaAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/vacunas/{id}",
     *      summary="Update the specified Vacuna in storage",
     *      tags={"Vacuna"},
     *      description="Update Vacuna",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Vacuna",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Vacuna that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Vacuna")
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
     *                  ref="#/definitions/Vacuna"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateVacunaAPIRequest $request)
    {
        $input = $request->all();

        /** @var Vacuna $vacuna */
        $vacuna = $this->vacunaRepository->findWithoutFail($id);

        if (empty($vacuna)) {
            return $this->sendError('Vacuna not found');
        }

        $vacuna = $this->vacunaRepository->update($input, $id);

        return $this->sendResponse($vacuna->toArray(), 'Vacuna updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/vacunas/{id}",
     *      summary="Remove the specified Vacuna from storage",
     *      tags={"Vacuna"},
     *      description="Delete Vacuna",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Vacuna",
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
        /** @var Vacuna $vacuna */
        $vacuna = $this->vacunaRepository->findWithoutFail($id);

        if (empty($vacuna)) {
            return $this->sendError('Vacuna not found');
        }

        $vacuna->delete();

        return $this->sendResponse($id, 'Vacuna deleted successfully');
    }
}
