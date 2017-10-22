<?php

use App\Models\PrevisionActual;
use App\Repositories\PrevisionActualRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PrevisionActualRepositoryTest extends TestCase
{
    use MakePrevisionActualTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var PrevisionActualRepository
     */
    protected $previsionActualRepo;

    public function setUp()
    {
        parent::setUp();
        $this->previsionActualRepo = App::make(PrevisionActualRepository::class);
    }

    /**
     * @test create
     */
    public function testCreatePrevisionActual()
    {
        $previsionActual = $this->fakePrevisionActualData();
        $createdPrevisionActual = $this->previsionActualRepo->create($previsionActual);
        $createdPrevisionActual = $createdPrevisionActual->toArray();
        $this->assertArrayHasKey('id', $createdPrevisionActual);
        $this->assertNotNull($createdPrevisionActual['id'], 'Created PrevisionActual must have id specified');
        $this->assertNotNull(PrevisionActual::find($createdPrevisionActual['id']), 'PrevisionActual with given id must be in DB');
        $this->assertModelData($previsionActual, $createdPrevisionActual);
    }

    /**
     * @test read
     */
    public function testReadPrevisionActual()
    {
        $previsionActual = $this->makePrevisionActual();
        $dbPrevisionActual = $this->previsionActualRepo->find($previsionActual->id);
        $dbPrevisionActual = $dbPrevisionActual->toArray();
        $this->assertModelData($previsionActual->toArray(), $dbPrevisionActual);
    }

    /**
     * @test update
     */
    public function testUpdatePrevisionActual()
    {
        $previsionActual = $this->makePrevisionActual();
        $fakePrevisionActual = $this->fakePrevisionActualData();
        $updatedPrevisionActual = $this->previsionActualRepo->update($fakePrevisionActual, $previsionActual->id);
        $this->assertModelData($fakePrevisionActual, $updatedPrevisionActual->toArray());
        $dbPrevisionActual = $this->previsionActualRepo->find($previsionActual->id);
        $this->assertModelData($fakePrevisionActual, $dbPrevisionActual->toArray());
    }

    /**
     * @test delete
     */
    public function testDeletePrevisionActual()
    {
        $previsionActual = $this->makePrevisionActual();
        $resp = $this->previsionActualRepo->delete($previsionActual->id);
        $this->assertTrue($resp);
        $this->assertNull(PrevisionActual::find($previsionActual->id), 'PrevisionActual should not exist in DB');
    }
}
