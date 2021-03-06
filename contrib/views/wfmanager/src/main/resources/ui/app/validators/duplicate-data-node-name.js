/*
*    Licensed to the Apache Software Foundation (ASF) under one or more
*    contributor license agreements.  See the NOTICE file distributed with
*    this work for additional information regarding copyright ownership.
*    The ASF licenses this file to You under the Apache License, Version 2.0
*    (the "License"); you may not use this file except in compliance with
*    the License.  You may obtain a copy of the License at
*
*        http://www.apache.org/licenses/LICENSE-2.0
*
*    Unless required by applicable law or agreed to in writing, software
*    distributed under the License is distributed on an "AS IS" BASIS,
*    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*    See the License for the specific language governing permissions and
*    limitations under the License.
*/
import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const DuplicateDataNodeName = BaseValidator.extend({
  validate(value, options, model, attribute) {
    if (model.get('dataNodes')) {
      var nodeNames = new Map();
      model.get("validationErrors").clear();
      model.get('dataNodes').forEach((item)=>{
        if (item.data.node && item.data.node.name) {
          Ember.set(item.data.node, "errors", false);
          if(nodeNames.get(item.data.node.name)){
            Ember.set(item.data.node, "errors", true);
            model.get("validationErrors").pushObject({node:item.data,message:"Node name should be unique"});
          }else{
            nodeNames.set(item.data.node.name, item.data);
            Ember.set(item.data.node, "errors", false);
          }
        }
      });

      if(model.get('dataNodes').length !== nodeNames.size){
        return false;
      }
      return true;
    }
    return true;
  }
});

DuplicateDataNodeName.reopenClass({
  /**
   * Define attribute specific dependent keys for your validator
   *
   * @param {String}  attribute   The attribute being evaluated
   * @param {Unknown} options     Options passed into your validator
   * @return {Array}
   */
  getDependentsFor(/* attribute, options */) {
    return [];
  }
});

export default DuplicateDataNodeName;
