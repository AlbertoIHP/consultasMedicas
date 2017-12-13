<?php

use App\Models\Ocupacion;
use App\Repositories\OcupacionRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class OcupacionRepositoryTest extends TestCase
{
    use MakeOcupacionTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var OcupacionRepository
     */
    protected $ocupacionRepo;

    public function setUp()
    {
        parent::setUp();
        $this->ocupacionRepo = App::make(OcupacionRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateOcupacion()
    {
        $ocupacion = $this->fakeOcupacionData();
        $createdOcupacion = $this->ocupacionRepo->create($ocupacion);
        $createdOcupacion = $createdOcupacion->toArray();
        $this->assertArrayHasKey('id', $createdOcupacion);
        $this->assertNotNull($createdOcupacion['id'], 'Created Ocupacion must have id specified');
        $this->assertNotNull(Ocupacion::find($createdOcupacion['id']), 'Ocupacion with given id must be in DB');
        $this->assertModelData($ocupacion, $createdOcupacion);
    }

    /**
     * @test read
     */
    public function testReadOcupacion()
    {
        $ocupacion = $this->makeOcupacion();
        $dbOcupacion = $this->ocupacionRepo->find($ocupacion->id);
        $dbOcupacion = $dbOcupacion->toArray();
        $this->assertModelData($ocupacion->toArray(), $dbOcupacion);
    }

    /**
     * @test update
     */
    public function testUpdateOcupacion()
    {
        $ocupacion = $this->makeOcupacion();
        $fakeOcupacion = $this->fakeOcupacionData();
        $updatedOcupacion = $this->ocupacionRepo->update($fakeOcupacion, $ocupacion->id);
        $this->assertModelData($fakeOcupacion, $updatedOcupacion->toArray());
        $dbOcupacion = $this->ocupacionRepo->find($ocupacion->id);
        $this->assertModelData($fakeOcupacion, $dbOcupacion->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteOcupacion()
    {
        $ocupacion = $this->makeOcupacion();
        $resp = $this->ocupacionRepo->delete($ocupacion->id);
        $this->assertTrue($resp);
        $this->assertNull(Ocupacion::find($ocupacion->id), 'Ocupacion should not exist in DB');
    }
}
