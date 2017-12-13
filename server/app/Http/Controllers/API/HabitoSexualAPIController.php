<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateHabitoSexualAPIRequest;
use App\Http\Requests\API\UpdateHabitoSexualAPIRequest;
use App\Models\HabitoSexual;
use App\Repositories\HabitoSexualRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class HabitoSexualController
 * @package App\Http\Controllers\API
 */

class HabitoSexualAPIController extends AppBaseController
{
    /** @var  HabitoSexualRepository */
    private $habitoSexualRepository;

    public function __construct(HabitoSexualRepository $habitoSexualRepo)
    {
        $this->habitoSexualRepository = $habitoSexualRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/habitoSexuals",
     *      summary="Get a listing of the HabitoSexuals.",
     *      tags={"HabitoSexual"},
     *      description="Get all HabitoSexuals",
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
     *                  @SWG\Items(ref="#/definitions/HabitoSexual")
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
        $this->habitoSexualRepository->pushCriteria(new RequestCriteria($request));
        $this->habitoSexualRepository->pushCriteria(new LimitOffsetCriteria($request));
        $habitoSexuals = $this->habitoSexualRepository->all();

        return $this->sendResponse($habitoSexuals->toArray(), 'Habito Sexuals retrieved successfully');
    }

    /**
     * @param CreateHabitoSexualAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/habitoSexuals",
     *      summary="Store a newly created HabitoSexual in storage",
     *      tags={"HabitoSexual"},
     *      description="Store HabitoSexual",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="HabitoSexual that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/HabitoSexual")
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
     *                  ref="#/definitions/HabitoSexual"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateHabitoSexualAPIRequest $request)
    {
        $input = $request->all();

        $habitoSexuals = $this->habitoSexualRepository->create($input);

        return $this->sendResponse($habitoSexuals->toArray(), 'Habito Sexual saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/habitoSexuals/{id}",
     *      summary="Display the specified HabitoSexual",
     *      tags={"HabitoSexual"},
     *      description="Get HabitoSexual",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of HabitoSexual",
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
     *                  ref="#/definitions/HabitoSexual"
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
        /** @var HabitoSexual $habitoSexual */
        $habitoSexual = $this->habitoSexualRepository->findWithoutFail($id);

        if (empty($habitoSexual)) {
            return $this->sendError('Habito Sexual not found');
        }

        return $this->sendResponse($habitoSexual->toArray(), 'Habito Sexual retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateHabitoSexualAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/habitoSexuals/{id}",
     *      summary="Update the specified HabitoSexual in storage",
     *      tags={"HabitoSexual"},
     *      description="Update HabitoSexual",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of HabitoSexual",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="HabitoSexual that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/HabitoSexual")
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
     *                  ref="#/definitions/HabitoSexual"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateHabitoSexualAPIRequest $request)
    {
        $input = $request->all();

        /** @var HabitoSexual $habitoSexual */
        $habitoSexual = $this->habitoSexualRepository->findWithoutFail($id);

        if (empty($habitoSexual)) {
            return $this->sendError('Habito Sexual not found');
        }

        $habitoSexual = $this->habitoSexualRepository->update($input, $id);

        return $this->sendResponse($habitoSexual->toArray(), 'HabitoSexual updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/habitoSexuals/{id}",
     *      summary="Remove the specified HabitoSexual from storage",
     *      tags={"HabitoSexual"},
     *      description="Delete HabitoSexual",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of HabitoSexual",
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
        /** @var HabitoSexual $habitoSexual */
        $habitoSexual = $this->habitoSexualRepository->findWithoutFail($id);

        if (empty($habitoSexual)) {
            return $this->sendError('Habito Sexual not found');
        }

        $habitoSexual->delete();

        return $this->sendResponse($id, 'Habito Sexual deleted successfully');
    }
}
