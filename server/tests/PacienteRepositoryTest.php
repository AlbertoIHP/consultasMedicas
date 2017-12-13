<?php

use App\Models\Paciente;
use App\Repositories\PacienteRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PacienteRepositoryTest extends TestCase
{
    use MakePacienteTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var PacienteRepository
     */
    protected $pacienteRepo;

    public function setUp()
    {
        parent::setUp();
        $this->pacienteRepo = App::make(PacienteRepository::class);
    }

    /**
     * @test create
     */
    public function testCreatePaciente()
    {
        $paciente = $this->fakePacienteData();
        $createdPaciente = $this->pacienteRepo->create($paciente);
        $createdPaciente = $createdPaciente->toArray();
        $this->assertArrayHasKey('id', $createdPaciente);
        $this->assertNotNull($createdPaciente['id'], 'Created Paciente must have id specified');
        $this->assertNotNull(Paciente::find($createdPaciente['id']), 'Paciente with given id must be in DB');
        $this->assertModelData($paciente, $createdPaciente);
    }

    /**
     * @test read
     */
    public function testReadPaciente()
    {
        $paciente = $this->makePaciente();
        $dbPaciente = $this->pacienteRepo->find($paciente->id);
        $dbPaciente = $dbPaciente->toArray();
        $this->assertModelData($paciente->toArray(), $dbPaciente);
    }

    /**
     * @test update
     */
    public function testUpdatePaciente()
    {
        $paciente = $this->makePaciente();
        $fakePaciente = $this->fakePacienteData();
        $updatedPaciente = $this->pacienteRepo->update($fakePaciente, $paciente->id);
        $this->assertModelData($fakePaciente, $updatedPaciente->toArray());
        $dbPaciente = $this->pacienteRepo->find($paciente->id);
        $this->assertModelData($fakePaciente, $dbPaciente->toArray());
    }

    /**
     * @test delete
     */
    public function testDeletePaciente()
    {
        $paciente = $this->makePaciente();
        $resp = $this->pacienteRepo->delete($paciente->id);
        $this->assertTrue($resp);
        $this->assertNull(Paciente::find($paciente->id), 'Paciente should not exist in DB');
    }
}
