<?php

use App\Models\Especialidad;
use App\Repositories\EspecialidadRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class EspecialidadRepositoryTest extends TestCase
{
    use MakeEspecialidadTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var EspecialidadRepository
     */
    protected $especialidadRepo;

    public function setUp()
    {
        parent::setUp();
        $this->especialidadRepo = App::make(EspecialidadRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateEspecialidad()
    {
        $especialidad = $this->fakeEspecialidadData();
        $createdEspecialidad = $this->especialidadRepo->create($especialidad);
        $createdEspecialidad = $createdEspecialidad->toArray();
        $this->assertArrayHasKey('id', $createdEspecialidad);
        $this->assertNotNull($createdEspecialidad['id'], 'Created Especialidad must have id specified');
        $this->assertNotNull(Especialidad::find($createdEspecialidad['id']), 'Especialidad with given id must be in DB');
        $this->assertModelData($especialidad, $createdEspecialidad);
    }

    /**
     * @test read
     */
    public function testReadEspecialidad()
    {
        $especialidad = $this->makeEspecialidad();
        $dbEspecialidad = $this->especialidadRepo->find($especialidad->id);
        $dbEspecialidad = $dbEspecialidad->toArray();
        $this->assertModelData($especialidad->toArray(), $dbEspecialidad);
    }

    /**
     * @test update
     */
    public function testUpdateEspecialidad()
    {
        $especialidad = $this->makeEspecialidad();
        $fakeEspecialidad = $this->fakeEspecialidadData();
        $updatedEspecialidad = $this->especialidadRepo->update($fakeEspecialidad, $especialidad->id);
        $this->assertModelData($fakeEspecialidad, $updatedEspecialidad->toArray());
        $dbEspecialidad = $this->especialidadRepo->find($especialidad->id);
        $this->assertModelData($fakeEspecialidad, $dbEspecialidad->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteEspecialidad()
    {
        $especialidad = $this->makeEspecialidad();
        $resp = $this->especialidadRepo->delete($especialidad->id);
        $this->assertTrue($resp);
        $this->assertNull(Especialidad::find($especialidad->id), 'Especialidad should not exist in DB');
    }
}
