<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateAtentionAPIRequest;
use App\Http\Requests\API\UpdateAtentionAPIRequest;
use App\Models\Atention;
use App\Repositories\AtentionRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class AtentionController
 * @package App\Http\Controllers\API
 */

class AtentionAPIController extends AppBaseController
{
    /** @var  AtentionRepository */
    private $atentionRepository;

    public function __construct(AtentionRepository $atentionRepo)
    {
        $this->atentionRepository = $atentionRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/atentions",
     *      summary="Get a listing of the Atentions.",
     *      tags={"Atention"},
     *      description="Get all Atentions",
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
     *                  @SWG\Items(ref="#/definitions/Atention")
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
        $this->atentionRepository->pushCriteria(new RequestCriteria($request));
        $this->atentionRepository->pushCriteria(new LimitOffsetCriteria($request));
        $atentions = $this->atentionRepository->all();

        return $this->sendResponse($atentions->toArray(), 'Atentions retrieved successfully');
    }

    /**
     * @param CreateAtentionAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/atentions",
     *      summary="Store a newly created Atention in storage",
     *      tags={"Atention"},
     *      description="Store Atention",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Atention that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Atention")
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
     *                  ref="#/definitions/Atention"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateAtentionAPIRequest $request)
    {
        $input = $request->all();

        $atentions = $this->atentionRepository->create($input);

        return $this->sendResponse($atentions->toArray(), 'Atention saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/atentions/{id}",
     *      summary="Display the specified Atention",
     *      tags={"Atention"},
     *      description="Get Atention",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Atention",
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
     *                  ref="#/definitions/Atention"
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
        /** @var Atention $atention */
        $atention = $this->atentionRepository->findWithoutFail($id);

        if (empty($atention)) {
            return $this->sendError('Atention not found');
        }

        return $this->sendResponse($atention->toArray(), 'Atention retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateAtentionAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/atentions/{id}",
     *      summary="Update the specified Atention in storage",
     *      tags={"Atention"},
     *      description="Update Atention",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Atention",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Atention that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Atention")
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
     *                  ref="#/definitions/Atention"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateAtentionAPIRequest $request)
    {
        $input = $request->all();

        /** @var Atention $atention */
        $atention = $this->atentionRepository->findWithoutFail($id);

        if (empty($atention)) {
            return $this->sendError('Atention not found');
        }

        $atention = $this->atentionRepository->update($input, $id);

        return $this->sendResponse($atention->toArray(), 'Atention updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/atentions/{id}",
     *      summary="Remove the specified Atention from storage",
     *      tags={"Atention"},
     *      description="Delete Atention",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Atention",
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
        /** @var Atention $atention */
        $atention = $this->atentionRepository->findWithoutFail($id);

        if (empty($atention)) {
            return $this->sendError('Atention not found');
        }

        $atention->delete();

        return $this->sendResponse($id, 'Atention deleted successfully');
    }
}
