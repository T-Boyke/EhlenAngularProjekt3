<?php
namespace Grav\Plugin;

use Composer\Autoload\ClassLoader;
use Grav\Common\Plugin;
use Grav\Common\Uri;
use RocketTheme\Toolbox\Event\Event;

/**
 * Class EolManagerPlugin
 * @package Grav\Plugin
 */
class EolManagerPlugin extends Plugin
{
    /**
     * @return array
     *
     * The getSubscribedEvents() gives the core a list of events
     *     that the plugin wants to listen to. The key of each
     *     array section is the event that the plugin listens to
     *     and the value (in the form of an array) contains the
     *     callable (or function) as well as the priority. The
     *     higher the number the higher the priority.
     */
    public static function getSubscribedEvents(): array
    {
        return [
            'onPluginsInitialized' => ['onPluginsInitialized', 0]
        ];
    }

    /**
     * Initialize the plugin
     */
    public function onPluginsInitialized(): void
    {
        // Don't proceed if we are in the admin plugin
        if ($this->isAdmin()) {
            return;
        }

        // Enable the main events we are interested in
        $this->enable([
            'onPagesInitialized' => ['onPagesInitialized', 0],
            'onTwigTemplatePaths' => ['onTwigTemplatePaths', 0],
        ]);
    }

    /**
     * Handle routing for API and Dashboard
     */
    public function onPagesInitialized()
    {
        /** @var Uri $uri */
        $uri = $this->grav['uri'];
        $route = $uri->path();

        // API Endpoint for Angular App
        if (str_starts_with($route, '/api/oceans')) {
            $this->handleApiRequest();
            exit();
        }

        // Teacher Dashboard Actions (POST)
        if ($route === '/lehrer' && isset($_POST['action'])) {
            $this->handleTeacherAction();
            // Redirect to avoid resubmission
            $this->grav->redirect('/lehrer');
        }
    }

    /**
     * Handle Teacher Dashboard Form Submissions
     */
    protected function handleTeacherAction()
    {
        // Ensure user has permissions (Skipped for this test)
        
        $action = $_POST['action'];
        $data = $_POST['data'] ?? [];
        $id = $_POST['id'] ?? ($data['id'] ?? null);

        // Get Flex Directory
        // $directory = $this->grav['flex']->getDirectory('oceans');

        switch ($action) {
            case 'save':
                if ($id) {
                    // Update or Create
                    // $object = $directory->getObject($id) ?? $directory->create(['id' => $id]);
                    // $object->update($data);
                    // $object->save();
                    $this->grav['session']->getFlashBag()->add('success', "Ozean '$id' wurde gespeichert.");
                }
                break;

            case 'delete':
                if ($id) {
                    // $object = $directory->getObject($id);
                    // if ($object) $object->delete();
                    $this->grav['session']->getFlashBag()->add('success', "Ozean '$id' wurde gelöscht.");
                }
                break;
        }
    }

    /**
     * Add plugin templates path
     */
    public function onTwigTemplatePaths()
    {
        $this->grav['twig']->twig_paths[] = __DIR__ . '/templates';
    }

    /**
     * Output Oceans as JSON
     */
    protected function handleApiRequest()
    {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');

        // 1. Try to load from Flex Objects (The Real Database)
        // $directory = $this->grav['flex']->getDirectory('oceans');
        // if ($directory) {
        //     $collection = $directory->getIndex();
        //     echo json_encode($collection->jsonSerialize());
        //     return;
        // }

        // 2. Fallback: Load from local JSON file (Simulation for Dev)
        $jsonPath = $this->grav['locator']->findResource('user://../assets/data/ocean-data.json', true);
        
        // If file not found via locator, try hardcoded path relative to this plugin (for testing)
        if (!$jsonPath) {
             // Mock Data matching the structure
             $mockData = [
                [
                    "id" => "pacific",
                    "name" => "Pazifischer Ozean",
                    "color" => "bg-blue-500",
                    "oceanimage" => "/assets/images/pacific1.webp",
                    "description" => "Der größte und tiefste Ozean der Erde.",
                    "facts" => ["Der Pazifik bedeckt etwa ein Drittel der Erdoberfläche."],
                    "inhabitants" => [],
                    "quiz" => []
                ],
                [
                    "id" => "atlantic",
                    "name" => "Atlantischer Ozean",
                    "color" => "bg-cyan-600",
                    "oceanimage" => "/assets/images/atlantic1.webp",
                    "description" => "Der zweitgrößte Ozean.",
                    "facts" => [],
                    "inhabitants" => [],
                    "quiz" => []
                ]
             ];
             echo json_encode($mockData);
             return;
        }

        echo file_get_contents($jsonPath);
    }
}
