<?php

use App\Models\EnfermedadesCronicasPaciente;
use App\Repositories\EnfermedadesCronicasPacienteRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class EnfermedadesCronicasPacienteRepositoryTest extends TestCase
{
    use MakeEnfermedadesCronicasPacienteTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var EnfermedadesCronicasPacienteRepository
     */
    protected $enfermedadesCronicasPacienteRepo;

    public function setUp()
    {
        parent::setUp();
        $this->enfermedadesCronicasPacienteRepo = App::make(EnfermedadesCronicasPacienteRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateEnfermedadesCronicasPaciente()
    {
        $enfermedadesCronicasPaciente = $this->fakeEnfermedadesCronicasPacienteData();
        $createdEnfermedadesCronicasPaciente = $this->enfermedadesCronicasPacienteRepo->create($enfermedadesCronicasPaciente);
        $createdEnfermedadesCronicasPaciente = $createdEnfermedadesCronicasPaciente->toArray();
        $this->assertArrayHasKey('id', $createdEnfermedadesCronicasPaciente);
        $this->assertNotNull($createdEnfermedadesCronicasPaciente['id'], 'Created EnfermedadesCronicasPaciente must have id specified');
        $this->assertNotNull(EnfermedadesCronicasPaciente::find($createdEnfermedadesCronicasPaciente['id']), 'EnfermedadesCronicasPaciente with given id must be in DB');
        $this->assertModelData($enfermedadesCronicasPaciente, $createdEnfermedadesCronicasPaciente);
    }

    /**
     * @test read
     */
    public function testReadEnfermedadesCronicasPaciente()
    {
        $enfermedadesCronicasPaciente = $this->makeEnfermedadesCronicasPaciente();
        $dbEnfermedadesCronicasPaciente = $this->enfermedadesCronicasPacienteRepo->find($enfermedadesCronicasPaciente->id);
        $dbEnfermedadesCronicasPaciente = $dbEnfermedadesCronicasPaciente->toArray();
        $this->assertModelData($enfermedadesCronicasPaciente->toArray(), $dbEnfermedadesCronicasPaciente);
    }

    /**
     * @test update
     */
    public function testUpdateEnfermedadesCronicasPaciente()
    {
        $enfermedadesCronicasPaciente = $this->makeEnfermedadesCronicasPaciente();
        $fakeEnfermedadesCronicasPaciente = $this->fakeEnfermedadesCronicasPacienteData();
        $updatedEnfermedadesCronicasPaciente = $this->enfermedadesCronicasPacienteRepo->update($fakeEnfermedadesCronicasPaciente, $enfermedadesCronicasPaciente->id);
        $this->assertModelData($fakeEnfermedadesCronicasPaciente, $updatedEnfermedadesCronicasPaciente->toArray());
        $dbEnfermedadesCronicasPaciente = $this->enfermedadesCronicasPacienteRepo->find($enfermedadesCronicasPaciente->id);
        $this->assertModelData($fakeEnfermedadesCronicasPaciente, $dbEnfermedadesCronicasPaciente->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteEnfermedadesCronicasPaciente()
    {
        $enfermedadesCronicasPaciente = $this->makeEnfermedadesCronicasPaciente();
        $resp = $this->enfermedadesCronicasPacienteRepo->delete($enfermedadesCronicasPaciente->id);
        $this->assertTrue($resp);
        $this->assertNull(EnfermedadesCronicasPaciente::find($enfermedadesCronicasPaciente->id), 'EnfermedadesCronicasPaciente should not exist in DB');
    }
}
