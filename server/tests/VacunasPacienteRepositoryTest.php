<?php

use App\Models\VacunasPaciente;
use App\Repositories\VacunasPacienteRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class VacunasPacienteRepositoryTest extends TestCase
{
    use MakeVacunasPacienteTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var VacunasPacienteRepository
     */
    protected $vacunasPacienteRepo;

    public function setUp()
    {
        parent::setUp();
        $this->vacunasPacienteRepo = App::make(VacunasPacienteRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateVacunasPaciente()
    {
        $vacunasPaciente = $this->fakeVacunasPacienteData();
        $createdVacunasPaciente = $this->vacunasPacienteRepo->create($vacunasPaciente);
        $createdVacunasPaciente = $createdVacunasPaciente->toArray();
        $this->assertArrayHasKey('id', $createdVacunasPaciente);
        $this->assertNotNull($createdVacunasPaciente['id'], 'Created VacunasPaciente must have id specified');
        $this->assertNotNull(VacunasPaciente::find($createdVacunasPaciente['id']), 'VacunasPaciente with given id must be in DB');
        $this->assertModelData($vacunasPaciente, $createdVacunasPaciente);
    }

    /**
     * @test read
     */
    public function testReadVacunasPaciente()
    {
        $vacunasPaciente = $this->makeVacunasPaciente();
        $dbVacunasPaciente = $this->vacunasPacienteRepo->find($vacunasPaciente->id);
        $dbVacunasPaciente = $dbVacunasPaciente->toArray();
        $this->assertModelData($vacunasPaciente->toArray(), $dbVacunasPaciente);
    }

    /**
     * @test update
     */
    public function testUpdateVacunasPaciente()
    {
        $vacunasPaciente = $this->makeVacunasPaciente();
        $fakeVacunasPaciente = $this->fakeVacunasPacienteData();
        $updatedVacunasPaciente = $this->vacunasPacienteRepo->update($fakeVacunasPaciente, $vacunasPaciente->id);
        $this->assertModelData($fakeVacunasPaciente, $updatedVacunasPaciente->toArray());
        $dbVacunasPaciente = $this->vacunasPacienteRepo->find($vacunasPaciente->id);
        $this->assertModelData($fakeVacunasPaciente, $dbVacunasPaciente->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteVacunasPaciente()
    {
        $vacunasPaciente = $this->makeVacunasPaciente();
        $resp = $this->vacunasPacienteRepo->delete($vacunasPaciente->id);
        $this->assertTrue($resp);
        $this->assertNull(VacunasPaciente::find($vacunasPaciente->id), 'VacunasPaciente should not exist in DB');
    }
}
