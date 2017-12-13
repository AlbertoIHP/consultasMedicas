<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateAlergiaAPIRequest;
use App\Http\Requests\API\UpdateAlergiaAPIRequest;
use App\Models\Alergia;
use App\Repositories\AlergiaRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class AlergiaController
 * @package App\Http\Controllers\API
 */

class AlergiaAPIController extends AppBaseController
{
    /** @var  AlergiaRepository */
    private $alergiaRepository;

    public function __construct(AlergiaRepository $alergiaRepo)
    {
        $this->alergiaRepository = $alergiaRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/alergias",
     *      summary="Get a listing of the Alergias.",
     *      tags={"Alergia"},
     *      description="Get all Alergias",
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
     *                  @SWG\Items(ref="#/definitions/Alergia")
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
        $this->alergiaRepository->pushCriteria(new RequestCriteria($request));
        $this->alergiaRepository->pushCriteria(new LimitOffsetCriteria($request));
        $alergias = $this->alergiaRepository->all();

        return $this->sendResponse($alergias->toArray(), 'Alergias retrieved successfully');
    }

    /**
     * @param CreateAlergiaAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/alergias",
     *      summary="Store a newly created Alergia in storage",
     *      tags={"Alergia"},
     *      description="Store Alergia",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Alergia that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Alergia")
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
     *                  ref="#/definitions/Alergia"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateAlergiaAPIRequest $request)
    {
        $input = $request->all();

        $alergias = $this->alergiaRepository->create($input);

        return $this->sendResponse($alergias->toArray(), 'Alergia saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/alergias/{id}",
     *      summary="Display the specified Alergia",
     *      tags={"Alergia"},
     *      description="Get Alergia",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Alergia",
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
     *                  ref="#/definitions/Alergia"
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
        /** @var Alergia $alergia */
        $alergia = $this->alergiaRepository->findWithoutFail($id);

        if (empty($alergia)) {
            return $this->sendError('Alergia not found');
        }

        return $this->sendResponse($alergia->toArray(), 'Alergia retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateAlergiaAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/alergias/{id}",
     *      summary="Update the specified Alergia in storage",
     *      tags={"Alergia"},
     *      description="Update Alergia",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Alergia",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Alergia that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Alergia")
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
     *                  ref="#/definitions/Alergia"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateAlergiaAPIRequest $request)
    {
        $input = $request->all();

        /** @var Alergia $alergia */
        $alergia = $this->alergiaRepository->findWithoutFail($id);

        if (empty($alergia)) {
            return $this->sendError('Alergia not found');
        }

        $alergia = $this->alergiaRepository->update($input, $id);

        return $this->sendResponse($alergia->toArray(), 'Alergia updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/alergias/{id}",
     *      summary="Remove the specified Alergia from storage",
     *      tags={"Alergia"},
     *      description="Delete Alergia",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Alergia",
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
        /** @var Alergia $alergia */
        $alergia = $this->alergiaRepository->findWithoutFail($id);

        if (empty($alergia)) {
            return $this->sendError('Alergia not found');
        }

        $alergia->delete();

        return $this->sendResponse($id, 'Alergia deleted successfully');
    }
}
