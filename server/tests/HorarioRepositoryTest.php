<?php

use App\Models\Horario;
use App\Repositories\HorarioRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class HorarioRepositoryTest extends TestCase
{
    use MakeHorarioTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var HorarioRepository
     */
    protected $horarioRepo;

    public function setUp()
    {
        parent::setUp();
        $this->horarioRepo = App::make(HorarioRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateHorario()
    {
        $horario = $this->fakeHorarioData();
        $createdHorario = $this->horarioRepo->create($horario);
        $createdHorario = $createdHorario->toArray();
        $this->assertArrayHasKey('id', $createdHorario);
        $this->assertNotNull($createdHorario['id'], 'Created Horario must have id specified');
        $this->assertNotNull(Horario::find($createdHorario['id']), 'Horario with given id must be in DB');
        $this->assertModelData($horario, $createdHorario);
    }

    /**
     * @test read
     */
    public function testReadHorario()
    {
        $horario = $this->makeHorario();
        $dbHorario = $this->horarioRepo->find($horario->id);
        $dbHorario = $dbHorario->toArray();
        $this->assertModelData($horario->toArray(), $dbHorario);
    }

    /**
     * @test update
     */
    public function testUpdateHorario()
    {
        $horario = $this->makeHorario();
        $fakeHorario = $this->fakeHorarioData();
        $updatedHorario = $this->horarioRepo->update($fakeHorario, $horario->id);
        $this->assertModelData($fakeHorario, $updatedHorario->toArray());
        $dbHorario = $this->horarioRepo->find($horario->id);
        $this->assertModelData($fakeHorario, $dbHorario->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteHorario()
    {
        $horario = $this->makeHorario();
        $resp = $this->horarioRepo->delete($horario->id);
        $this->assertTrue($resp);
        $this->assertNull(Horario::find($horario->id), 'Horario should not exist in DB');
    }
}
