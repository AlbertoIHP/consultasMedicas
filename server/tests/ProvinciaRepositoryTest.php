<?php

use App\Models\Provincia;
use App\Repositories\ProvinciaRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ProvinciaRepositoryTest extends TestCase
{
    use MakeProvinciaTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var ProvinciaRepository
     */
    protected $provinciaRepo;

    public function setUp()
    {
        parent::setUp();
        $this->provinciaRepo = App::make(ProvinciaRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateProvincia()
    {
        $provincia = $this->fakeProvinciaData();
        $createdProvincia = $this->provinciaRepo->create($provincia);
        $createdProvincia = $createdProvincia->toArray();
        $this->assertArrayHasKey('id', $createdProvincia);
        $this->assertNotNull($createdProvincia['id'], 'Created Provincia must have id specified');
        $this->assertNotNull(Provincia::find($createdProvincia['id']), 'Provincia with given id must be in DB');
        $this->assertModelData($provincia, $createdProvincia);
    }

    /**
     * @test read
     */
    public function testReadProvincia()
    {
        $provincia = $this->makeProvincia();
        $dbProvincia = $this->provinciaRepo->find($provincia->id);
        $dbProvincia = $dbProvincia->toArray();
        $this->assertModelData($provincia->toArray(), $dbProvincia);
    }

    /**
     * @test update
     */
    public function testUpdateProvincia()
    {
        $provincia = $this->makeProvincia();
        $fakeProvincia = $this->fakeProvinciaData();
        $updatedProvincia = $this->provinciaRepo->update($fakeProvincia, $provincia->id);
        $this->assertModelData($fakeProvincia, $updatedProvincia->toArray());
        $dbProvincia = $this->provinciaRepo->find($provincia->id);
        $this->assertModelData($fakeProvincia, $dbProvincia->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteProvincia()
    {
        $provincia = $this->makeProvincia();
        $resp = $this->provinciaRepo->delete($provincia->id);
        $this->assertTrue($resp);
        $this->assertNull(Provincia::find($provincia->id), 'Provincia should not exist in DB');
    }
}
