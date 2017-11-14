<?php

use App\Models\Disponibilidad;
use App\Repositories\DisponibilidadRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class DisponibilidadRepositoryTest extends TestCase
{
    use MakeDisponibilidadTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var DisponibilidadRepository
     */
    protected $disponibilidadRepo;

    public function setUp()
    {
        parent::setUp();
        $this->disponibilidadRepo = App::make(DisponibilidadRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateDisponibilidad()
    {
        $disponibilidad = $this->fakeDisponibilidadData();
        $createdDisponibilidad = $this->disponibilidadRepo->create($disponibilidad);
        $createdDisponibilidad = $createdDisponibilidad->toArray();
        $this->assertArrayHasKey('id', $createdDisponibilidad);
        $this->assertNotNull($createdDisponibilidad['id'], 'Created Disponibilidad must have id specified');
        $this->assertNotNull(Disponibilidad::find($createdDisponibilidad['id']), 'Disponibilidad with given id must be in DB');
        $this->assertModelData($disponibilidad, $createdDisponibilidad);
    }

    /**
     * @test read
     */
    public function testReadDisponibilidad()
    {
        $disponibilidad = $this->makeDisponibilidad();
        $dbDisponibilidad = $this->disponibilidadRepo->find($disponibilidad->id);
        $dbDisponibilidad = $dbDisponibilidad->toArray();
        $this->assertModelData($disponibilidad->toArray(), $dbDisponibilidad);
    }

    /**
     * @test update
     */
    public function testUpdateDisponibilidad()
    {
        $disponibilidad = $this->makeDisponibilidad();
        $fakeDisponibilidad = $this->fakeDisponibilidadData();
        $updatedDisponibilidad = $this->disponibilidadRepo->update($fakeDisponibilidad, $disponibilidad->id);
        $this->assertModelData($fakeDisponibilidad, $updatedDisponibilidad->toArray());
        $dbDisponibilidad = $this->disponibilidadRepo->find($disponibilidad->id);
        $this->assertModelData($fakeDisponibilidad, $dbDisponibilidad->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteDisponibilidad()
    {
        $disponibilidad = $this->makeDisponibilidad();
        $resp = $this->disponibilidadRepo->delete($disponibilidad->id);
        $this->assertTrue($resp);
        $this->assertNull(Disponibilidad::find($disponibilidad->id), 'Disponibilidad should not exist in DB');
    }
}
