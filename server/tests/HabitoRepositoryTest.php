<?php

use App\Models\Habito;
use App\Repositories\HabitoRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class HabitoRepositoryTest extends TestCase
{
    use MakeHabitoTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var HabitoRepository
     */
    protected $habitoRepo;

    public function setUp()
    {
        parent::setUp();
        $this->habitoRepo = App::make(HabitoRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateHabito()
    {
        $habito = $this->fakeHabitoData();
        $createdHabito = $this->habitoRepo->create($habito);
        $createdHabito = $createdHabito->toArray();
        $this->assertArrayHasKey('id', $createdHabito);
        $this->assertNotNull($createdHabito['id'], 'Created Habito must have id specified');
        $this->assertNotNull(Habito::find($createdHabito['id']), 'Habito with given id must be in DB');
        $this->assertModelData($habito, $createdHabito);
    }

    /**
     * @test read
     */
    public function testReadHabito()
    {
        $habito = $this->makeHabito();
        $dbHabito = $this->habitoRepo->find($habito->id);
        $dbHabito = $dbHabito->toArray();
        $this->assertModelData($habito->toArray(), $dbHabito);
    }

    /**
     * @test update
     */
    public function testUpdateHabito()
    {
        $habito = $this->makeHabito();
        $fakeHabito = $this->fakeHabitoData();
        $updatedHabito = $this->habitoRepo->update($fakeHabito, $habito->id);
        $this->assertModelData($fakeHabito, $updatedHabito->toArray());
        $dbHabito = $this->habitoRepo->find($habito->id);
        $this->assertModelData($fakeHabito, $dbHabito->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteHabito()
    {
        $habito = $this->makeHabito();
        $resp = $this->habitoRepo->delete($habito->id);
        $this->assertTrue($resp);
        $this->assertNull(Habito::find($habito->id), 'Habito should not exist in DB');
    }
}
