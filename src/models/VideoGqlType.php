<?php

namespace dukt\videos\models;

use craft\gql\GqlEntityRegistry;
use fruitstudios\linkit\generators\LinkitType;
use GraphQL\Type\Definition\InterfaceType;
use GraphQL\Type\Definition\Type;

/**
 * Class VideoGqlType
 * @package dukt\videos\models
 */
class VideoGqlType
{
    /**
     * @return string
     */
    public static function getName(): string
    {
        return 'videoField_Video';
    }

    /**
     * @return Type
     */
    public static function getType()
    {
        if ($type = GqlEntityRegistry::getEntity(self::class)) {
            return $type;
        }

        $type = GqlEntityRegistry::createEntity(
            self::class,
            new InterfaceType(
                [
                    'name' => static::getName(),
                    'fields' => self::class . '::getFieldDefinitions',
                ]
            )
        );

        return $type;
    }

    /**
     * @return array
     */
    public static function getFieldDefinitions(): array
    {
        return [
            'title' => [
                'name' => 'title',
                'type' => Type::string()
            ],
            'url' => [
                'name' => 'url',
                'type' => Type::string()
            ],
            'embed' => [
                'name' => 'embed',
                'type' => Type::string()
            ]
        ];
    }
}
