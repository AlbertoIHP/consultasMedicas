<?php

use App\Models\Persona;
use App\Repositories\PersonaRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PersonaRepositoryTest extends TestCase
{
    use MakePersonaTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var PersonaRepository
     */
    protected $personaRepo;

    public function setUp()
    {
        parent::setUp();
        $this->personaRepo = App::make(PersonaRepository::class);
    }

    /**
     * @test create
     */
    public function testCreatePersona()
    {
        $persona = $this->fakePersonaData();
        $createdPersona = $this->personaRepo->create($persona);
        $createdPersona = $createdPersona->toArray();
        $this->assertArrayHasKey('id', $createdPersona);
        $this->assertNotNull($createdPersona['id'], 'Created Persona must have id specified');
        $this->assertNotNull(Persona::find($createdPersona['id']), 'Persona with given id must be in DB');
        $this->assertModelData($persona, $createdPersona);
    }

    /**
     * @test read
     */
    public function testReadPersona()
    {
        $persona = $this->makePersona();
        $dbPersona = $this->personaRepo->find($persona->id);
        $dbPersona = $dbPersona->toArray();
        $this->assertModelData($persona->toArray(), $dbPersona);
    }

    /**
     * @test update
     */
    public function testUpdatePersona()
    {
        $persona = $this->makePersona();
        $fakePersona = $this->fakePersonaData();
        $updatedPersona = $this->personaRepo->update($fakePersona, $persona->id);
        $this->assertModelData($fakePersona, $updatedPersona->toArray());
        $dbPersona = $this->personaRepo->find($persona->id);
        $this->assertModelData($fakePersona, $dbPersona->toArray());
    }

    /**
     * @test delete
     */
    public function testDeletePersona()
    {
        $persona = $this->makePersona();
        $resp = $this->personaRepo->delete($persona->id);
        $this->assertTrue($resp);
        $this->assertNull(Persona::find($persona->id), 'Persona should not exist in DB');
    }
}
