<?php

use App\Models\Prevision;
use App\Repositories\PrevisionRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PrevisionRepositoryTest extends TestCase
{
    use MakePrevisionTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var PrevisionRepository
     */
    protected $previsionRepo;

    public function setUp()
    {
        parent::setUp();
        $this->previsionRepo = App::make(PrevisionRepository::class);
    }

    /**
     * @test create
     */
    public function testCreatePrevision()
    {
        $prevision = $this->fakePrevisionData();
        $createdPrevision = $this->previsionRepo->create($prevision);
        $createdPrevision = $createdPrevision->toArray();
        $this->assertArrayHasKey('id', $createdPrevision);
        $this->assertNotNull($createdPrevision['id'], 'Created Prevision must have id specified');
        $this->assertNotNull(Prevision::find($createdPrevision['id']), 'Prevision with given id must be in DB');
        $this->assertModelData($prevision, $createdPrevision);
    }

    /**
     * @test read
     */
    public function testReadPrevision()
    {
        $prevision = $this->makePrevision();
        $dbPrevision = $this->previsionRepo->find($prevision->id);
        $dbPrevision = $dbPrevision->toArray();
        $this->assertModelData($prevision->toArray(), $dbPrevision);
    }

    /**
     * @test update
     */
    public function testUpdatePrevision()
    {
        $prevision = $this->makePrevision();
        $fakePrevision = $this->fakePrevisionData();
        $updatedPrevision = $this->previsionRepo->update($fakePrevision, $prevision->id);
        $this->assertModelData($fakePrevision, $updatedPrevision->toArray());
        $dbPrevision = $this->previsionRepo->find($prevision->id);
        $this->assertModelData($fakePrevision, $dbPrevision->toArray());
    }

    /**
     * @test delete
     */
    public function testDeletePrevision()
    {
        $prevision = $this->makePrevision();
        $resp = $this->previsionRepo->delete($prevision->id);
        $this->assertTrue($resp);
        $this->assertNull(Prevision::find($prevision->id), 'Prevision should not exist in DB');
    }
}
