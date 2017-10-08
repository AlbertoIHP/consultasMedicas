<?php

use App\Models\EstadoCivil;
use App\Repositories\EstadoCivilRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class EstadoCivilRepositoryTest extends TestCase
{
    use MakeEstadoCivilTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var EstadoCivilRepository
     */
    protected $estadoCivilRepo;

    public function setUp()
    {
        parent::setUp();
        $this->estadoCivilRepo = App::make(EstadoCivilRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateEstadoCivil()
    {
        $estadoCivil = $this->fakeEstadoCivilData();
        $createdEstadoCivil = $this->estadoCivilRepo->create($estadoCivil);
        $createdEstadoCivil = $createdEstadoCivil->toArray();
        $this->assertArrayHasKey('id', $createdEstadoCivil);
        $this->assertNotNull($createdEstadoCivil['id'], 'Created EstadoCivil must have id specified');
        $this->assertNotNull(EstadoCivil::find($createdEstadoCivil['id']), 'EstadoCivil with given id must be in DB');
        $this->assertModelData($estadoCivil, $createdEstadoCivil);
    }

    /**
     * @test read
     */
    public function testReadEstadoCivil()
    {
        $estadoCivil = $this->makeEstadoCivil();
        $dbEstadoCivil = $this->estadoCivilRepo->find($estadoCivil->id);
        $dbEstadoCivil = $dbEstadoCivil->toArray();
        $this->assertModelData($estadoCivil->toArray(), $dbEstadoCivil);
    }

    /**
     * @test update
     */
    public function testUpdateEstadoCivil()
    {
        $estadoCivil = $this->makeEstadoCivil();
        $fakeEstadoCivil = $this->fakeEstadoCivilData();
        $updatedEstadoCivil = $this->estadoCivilRepo->update($fakeEstadoCivil, $estadoCivil->id);
        $this->assertModelData($fakeEstadoCivil, $updatedEstadoCivil->toArray());
        $dbEstadoCivil = $this->estadoCivilRepo->find($estadoCivil->id);
        $this->assertModelData($fakeEstadoCivil, $dbEstadoCivil->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteEstadoCivil()
    {
        $estadoCivil = $this->makeEstadoCivil();
        $resp = $this->estadoCivilRepo->delete($estadoCivil->id);
        $this->assertTrue($resp);
        $this->assertNull(EstadoCivil::find($estadoCivil->id), 'EstadoCivil should not exist in DB');
    }
}
