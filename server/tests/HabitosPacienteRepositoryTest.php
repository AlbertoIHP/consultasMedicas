<?php

use App\Models\HabitosPaciente;
use App\Repositories\HabitosPacienteRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class HabitosPacienteRepositoryTest extends TestCase
{
    use MakeHabitosPacienteTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var HabitosPacienteRepository
     */
    protected $habitosPacienteRepo;

    public function setUp()
    {
        parent::setUp();
        $this->habitosPacienteRepo = App::make(HabitosPacienteRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateHabitosPaciente()
    {
        $habitosPaciente = $this->fakeHabitosPacienteData();
        $createdHabitosPaciente = $this->habitosPacienteRepo->create($habitosPaciente);
        $createdHabitosPaciente = $createdHabitosPaciente->toArray();
        $this->assertArrayHasKey('id', $createdHabitosPaciente);
        $this->assertNotNull($createdHabitosPaciente['id'], 'Created HabitosPaciente must have id specified');
        $this->assertNotNull(HabitosPaciente::find($createdHabitosPaciente['id']), 'HabitosPaciente with given id must be in DB');
        $this->assertModelData($habitosPaciente, $createdHabitosPaciente);
    }

    /**
     * @test read
     */
    public function testReadHabitosPaciente()
    {
        $habitosPaciente = $this->makeHabitosPaciente();
        $dbHabitosPaciente = $this->habitosPacienteRepo->find($habitosPaciente->id);
        $dbHabitosPaciente = $dbHabitosPaciente->toArray();
        $this->assertModelData($habitosPaciente->toArray(), $dbHabitosPaciente);
    }

    /**
     * @test update
     */
    public function testUpdateHabitosPaciente()
    {
        $habitosPaciente = $this->makeHabitosPaciente();
        $fakeHabitosPaciente = $this->fakeHabitosPacienteData();
        $updatedHabitosPaciente = $this->habitosPacienteRepo->update($fakeHabitosPaciente, $habitosPaciente->id);
        $this->assertModelData($fakeHabitosPaciente, $updatedHabitosPaciente->toArray());
        $dbHabitosPaciente = $this->habitosPacienteRepo->find($habitosPaciente->id);
        $this->assertModelData($fakeHabitosPaciente, $dbHabitosPaciente->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteHabitosPaciente()
    {
        $habitosPaciente = $this->makeHabitosPaciente();
        $resp = $this->habitosPacienteRepo->delete($habitosPaciente->id);
        $this->assertTrue($resp);
        $this->assertNull(HabitosPaciente::find($habitosPaciente->id), 'HabitosPaciente should not exist in DB');
    }
}
