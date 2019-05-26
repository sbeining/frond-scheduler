<?php

namespace App\Form\DataTransformer;

use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;

class TdDateTimeTransformer implements DataTransformerInterface
{
    /**
     * Duplicates the given value through the array.
     *
     * @param mixed $value The value
     *
     * @return array The array
     */
    public function transform($value)
    {
        return [
          'iso' => $value,
          'picker' => $value,
        ];
    }

    public function reverseTransform($array)
    {
        if (!\is_array($array)) {
            throw new TransformationFailedException('Expected an array.');
        }

        // Just return the ISO / RFC date format
        return $array['iso'];
    }
}

