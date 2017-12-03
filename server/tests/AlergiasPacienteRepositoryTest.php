<?php

use App\Models\AlergiasPaciente;
use App\Repositories\AlergiasPacienteRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AlergiasPacienteRepositoryTest extends TestCase
{
    use MakeAlergiasPacienteTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var AlergiasPacienteRepository
     */
    protected $alergiasPacienteRepo;

    public function setUp()
    {
        parent::setUp();
        $this->alergiasPacienteRepo = App::make(AlergiasPacienteRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateAlergiasPaciente()
    {
        $alergiasPaciente = $this->fakeAlergiasPacienteData();
        $createdAlergiasPaciente = $this->alergiasPacienteRepo->create($alergiasPaciente);
        $createdAlergiasPaciente = $createdAlergiasPaciente->toArray();
        $this->assertArrayHasKey('id', $createdAlergiasPaciente);
        $this->assertNotNull($createdAlergiasPaciente['id'], 'Created AlergiasPaciente must have id specified');
        $this->assertNotNull(AlergiasPaciente::find($createdAlergiasPaciente['id']), 'AlergiasPaciente with given id must be in DB');
        $this->assertModelData($alergiasPaciente, $createdAlergiasPaciente);
    }

    /**
     * @test read
     */
    public function testReadAlergiasPaciente()
    {
        $alergiasPaciente = $this->makeAlergiasPaciente();
        $dbAlergiasPaciente = $this->alergiasPacienteRepo->find($alergiasPaciente->id);
        $dbAlergiasPaciente = $dbAlergiasPaciente->toArray();
        $this->assertModelData($alergiasPaciente->toArray(), $dbAlergiasPaciente);
    }

    /**
     * @test update
     */
    public function testUpdateAlergiasPaciente()
    {
        $alergiasPaciente = $this->makeAlergiasPaciente();
        $fakeAlergiasPaciente = $this->fakeAlergiasPacienteData();
        $updatedAlergiasPaciente = $this->alergiasPacienteRepo->update($fakeAlergiasPaciente, $alergiasPaciente->id);
        $this->assertModelData($fakeAlergiasPaciente, $updatedAlergiasPaciente->toArray());
        $dbAlergiasPaciente = $this->alergiasPacienteRepo->find($alergiasPaciente->id);
        $this->assertModelData($fakeAlergiasPaciente, $dbAlergiasPaciente->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteAlergiasPaciente()
    {
        $alergiasPaciente = $this->makeAlergiasPaciente();
        $resp = $this->alergiasPacienteRepo->delete($alergiasPaciente->id);
        $this->assertTrue($resp);
        $this->assertNull(AlergiasPaciente::find($alergiasPaciente->id), 'AlergiasPaciente should not exist in DB');
    }
}
